import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { UsersService } from 'src/common/service/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-cover.component.html',
  styleUrls: ['./navbar-cover.component.css']
})
export class NavbarCoverComponent implements OnInit {


  isNotificationOpen = false
  @Input('notification') notification: any[];
  @Input('count') count: number
  constructor(
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit(): void {
    
  }

  moveProfileScreen()
  {
    this.router.navigate(["/profile"])
  }
  moveIndexScreen()
  {
    this.router.navigate(["/index"])
  }

  moveFollowScreen()
  {
    this.router.navigate(["/people"])
  }

  moveMessageScreen()
  {
    this.router.navigate(["/messenger"])
  }

  notificationOpen(event)
  {
    const element = $(event.target)
    if(this.isNotificationOpen) {
      element.parent().parent().find('#notification').addClass('hide')
      this.isNotificationOpen = !this.isNotificationOpen
    } else {
      element.parent().parent().find('#notification').removeClass('hide')
      this.isNotificationOpen = !this.isNotificationOpen
    }
    
  }

  readNotification(id, postId) {
    if(id) {
      this.usersService.readNotification(id).subscribe(data => {
        if(data.code == 200) {
          this.notification = new Array()
          this.usersService.getAllUserNotification().subscribe(datas => {
            this.notification = datas.data
            this.count = datas.count
          })
        }
      })

      this.router.navigate(['post-detail'], { queryParams: { id:  postId} }).then(() => {window.location.reload()});
    }
  }
}
