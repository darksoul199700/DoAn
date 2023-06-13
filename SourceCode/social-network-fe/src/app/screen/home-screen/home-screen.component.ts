import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalPostStatusComponent } from 'src/app/components/modal/modal-post-status/modal-post-status.component';
import { baseApi } from 'src/common/service/backend-api';
import { CommentService } from 'src/common/service/comment.service';
import { NotificationService } from 'src/common/service/notification.service';
import { PostService } from 'src/common/service/post.service';
import { UsersService } from 'src/common/service/users.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  user:any = ''
  avatar: string = ''
  path: any[] = new Array()
  savePhotoUrl: any[] = new Array()
  caption: string = ''
  post: any[] = new Array()
  notifications: any[]
  unReadNoti: number

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private router: Router,
    private commentService: CommentService,
    private postService: PostService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.dosothing() //init notification
    this.notificationService.receiveNotification().subscribe(data => {
      this.dosothing()
    })
    if(isNullOrUndefined(currentUser)){
      this.router.navigate([""])
    }
    else {
      this.userService.usersDetail().subscribe(
        (result) => {
          if(result)
          {
            this.user = result
          }
        }
      )
      this.userService.getUserPhotoUrl().subscribe(
        (result) => {
          if(result)
          {
            this.avatar = baseApi + '/' + result.photoUrl
          }
        }
      )
      this.userService.getAllPost().subscribe(
        (result) => {
          if(result)
          {
            this.post = result.data
            // console.log(this.post)
          }
        }
      )
    }
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalPostStatusComponent, {
      width: '550px',
      data: {
        user: this.user,
        avatar: this.avatar,
        path: this.path,
        caption: this.caption
      }
    })

    dialogRef.afterClosed().subscribe(async (result) => {
      if(result){
        this.path = result[0]
        if(!isNullOrUndefined(result[1])) this.caption = result[1]
        console.log(result)

        const tasks$ = [];
        if ((this.path  as File[]).length > 0) {
          (this.path  as File[]).forEach((file) => {
            tasks$.push(this.postService.uploadPostImagesToServer(file));
          });
        }

        if (tasks$.length === 0 && this.caption !== '') {
          const create_at = new Date()
          const results = await this.userService.usersSendPost(this.caption, null, create_at)
          results.subscribe((response) => {
            if(response.code == 201) {
              this.notificationService.sendNotification(this.user.users_id, this.user.username, 'has a new post', response.data.id);
              window.location.reload();
            }
          })
        } else {
          forkJoin(...tasks$).pipe(map((results) => {
            const arrayPhotosUrl = [];
            if (results && results.length) {
              results.forEach((result) => {
                arrayPhotosUrl.push(result.url);
              })
            };
            return arrayPhotosUrl;
          })).subscribe(finalResult => {
              const create_at = new Date()
              const results = this.userService.usersSendPost(this.caption, finalResult, create_at)
              results.subscribe((response) => {
                if(response.code == 201) {
                  this.notificationService.sendNotification(this.user.users_id, this.user.username, 'has a new post', response.data.id);
                  window.location.reload()
                }
              })
            });
        };
      }
    })
  }

  dosothing() {
    this.notifications = new Array()
    this.userService.getAllUserNotification().subscribe(datas => {
      if(!isNullOrUndefined(datas)) {
        this.unReadNoti = datas.count
        datas.data.map(x => {
          this.notifications.push(x)
        })
      }
      
    })
  }
}
