import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/common/service/users.service';

@Component({
  selector: 'app-people-friend-screen',
  templateUrl: './people-friend-screen.component.html',
  styleUrls: ['./people-friend-screen.component.css']
})
export class PeopleFriendScreenComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  post
  usersId
  usersDetail: any

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.usersId = params.id;
    })

    // this.usersService.usersDetail().subscribe(user => {
    //   this.currentUser = user
    // })
    this.usersService.usersDetailById(this.usersId).subscribe(result => {
      this.usersDetail = result.data
    })

    this.usersService.getAllUsersPost(this.usersId).subscribe(result => {
      if(result.code == 200) {
        this.post = result.data
      }
    })
  }


  navigateMessage() {
    this.router.navigate(["/messenger"])
  }

}
