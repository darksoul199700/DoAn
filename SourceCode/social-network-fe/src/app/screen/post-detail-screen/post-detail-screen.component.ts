import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
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
  selector: 'app-post-detail-screen',
  templateUrl: './post-detail-screen.component.html',
  styleUrls: ['./post-detail-screen.component.css']
})
export class PostDetailScreenComponent implements OnInit {

  id
  postDetail
  imageObject: Array<object>
  is_Like: boolean = false
  currentUser
  listComment: any[]
  oldestComment: any[]
  newestComment: any[]
  isShowMore = false
  press = false


  avatar: string = ''
  path: any[] = new Array()
  caption: string = ''

  notifications: any[]
  unReadNoti: number
  baseApiUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private postService: PostService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.imageObject = new Array()
    this.listComment = new Array()
    this.oldestComment = new Array()
    this.newestComment = new Array()
    this.baseApiUrl = baseApi;

    this.dosothing()

    

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    })

    this.usersService.usersDetail().subscribe(response => {
      if (response.code === 200) {
        this.currentUser = response.data
      }
      
    })

    this.usersService.getUserPhotoUrl().subscribe(
      (result) => {
        if(result)
        {
          this.avatar = baseApi + "/" + result.photoUrl
        }
      }
    )

    this.usersService.getPostDetail(this.id).subscribe(data => {
      this.postDetail = data.data

      this.is_Like = this.postDetail.is_currentUser_like
      this.caption = this.postDetail.caption
      if(this.postDetail.photo) {
        this.postDetail.photo.map(image => {
          let imageObject = {
            image : baseApi + '/' + image,
            thumbImage: baseApi + '/' + image,
            alt: 'image of post',
            title: ''
          }
          this.imageObject.push(imageObject)
        })
      }
      if(this.postDetail.postComment.length > 0) {
        this.postDetail.postComment.map((x,i) => {
          if(i < 3) {
            this.oldestComment.push(x)
          } else {
            this.newestComment.push(x)
          }
          this.listComment.push(x)
        })
      }
      if(this.postDetail.photo) {
        this.path = this.postDetail.photo
      }

    })

    this.commentService.receiveComment().subscribe(data => {
      if(this.postDetail.id == data.post) {
        $('.list-comment').append(
          `<div class="comment-item">
            <p><span style="font-weight: bold;">${data.sender}</span><span>: ${data.messages}</span></p>
          </div>
          `
        )
      }
      
    })

    this.notificationService.receiveNotification().subscribe(data => {
      this.dosothing()
    })
    
  }

  howlong(time) {

    return moment(time).fromNow()
  }

  showMoreComment(event) {
    if(!this.isShowMore) {
      let oldComment = $(event.target).parent().find('.new-comment')
      oldComment.removeClass('hide')
      this.isShowMore = true
    } else {
      let oldComment = $(event.target).parent().find('.new-comment')
      oldComment.addClass('hide')
      this.isShowMore = false
    }
  
  }

  async submitComment(value) {
    let createAt = new Date()
    if(!isNullOrUndefined(value) && value !== '') {
      const result = await this.postService.commentAPost(this.postDetail.id, value, createAt).subscribe(values => {
        $('.new-comment').append(
          `<div class="comment-item">
            <p><span style="font-weight: bold;">${this.currentUser.username}</span><span>: ${value}</span></p>
          </div>
          `
        )
      })
    }
  }

  changevalue(event) {
    const element = $(event.target)
    element.on('keydown', (e) => {
      if(this.press == false) {
        if(e.keyCode == 13) {
          this.press = true
          this.commentService.sendComment(element.text(), this.currentUser.username, this.postDetail.id)
          this.submitComment(element.text())
          element.empty()
          window.getSelection().removeAllRanges() // reset cursor
        }
      }
    })
    this.press = false
    element.focus()
  }

  async toggle(postId){
    this.is_Like = !this.is_Like
    let createAt = new Date()
    const result = await this.usersService.postLikeAPost(createAt, postId).subscribe(value => {
      if(this.is_Like == true && value.code == 200) {
        
        this.postDetail.countLike = this.postDetail.countLike + 1
      } else if(this.is_Like == false && value.code == 200) {
        this.postDetail.countLike = this.postDetail.countLike - 1
      }
    })
  }
  
  edit() {
    const dialogRef = this.dialog.open(ModalPostStatusComponent, {
      width: '550px',
      data: {
        user: this.currentUser,
        avatar: this.avatar,
        path: this.path,
        caption: this.caption,
        files: []
      }
    })

    dialogRef.afterClosed().subscribe(data => {
      if(!isNullOrUndefined(data)) {
        let currentTime = new Date();
        const tasks$ = [];
        if ((data[2] as File[]).length > 0) {
          (data[2] as File[]).forEach((file) => {
            tasks$.push(this.postService.uploadPostImagesToServer(file));
          });
        }

        if (tasks$.length === 0) {
          this.usersService.usersUpdatePost(this.id, data[1], data[0], currentTime).subscribe((response) => {
            if (response.code === 200) {
              this.ngOnInit();
            }
          });
        } else {
          forkJoin(...tasks$).pipe(map((results) => {
            const arrayPhotosUrl = data[0];
            if (results && results.length) {
              results.forEach((result) => {
                arrayPhotosUrl.push(result.url);
              })
            };
            return arrayPhotosUrl;
          })).subscribe(finalResult => {
              this.usersService.usersUpdatePost(this.postDetail.id, data[1], finalResult, currentTime).subscribe(result => {
              if(result.code == 200) {
                this.ngOnInit()
              }
            })
          });
        }
      }
    })
  }

  deletePost() {
    this.usersService.usersDeletePost(this.id).subscribe(result => {
      if(result.code == 200) {
        this.router.navigate(["/index"])
      }
    })
  }

  dosothing() {
    this.notifications = new Array()
    this.usersService.getAllUserNotification().subscribe(datas => {
      
      if(!isNullOrUndefined(datas)) {
        this.unReadNoti = datas.count
        datas.data.map(x => {
          this.notifications.push(x)
        })
      }
      console.log(this.unReadNoti, this.notifications)
      
    })
  }

}
