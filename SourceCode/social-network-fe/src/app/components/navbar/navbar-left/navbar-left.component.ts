import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent implements OnInit {

  @Output() onTabChange: EventEmitter<any> = new EventEmitter();
  pageType: string = 'profile-detail';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  };

  logout()
  {
    localStorage.clear()
    this.router.navigate([""]).then(() => {
      window.location.reload()
    })
  };

  changePasswordClick() {
    this.pageType = "change-password";
    this.onTabChange.emit("change-password");
  };

  profileDetailClick() {
    this.pageType = "profile-detail";
    this.onTabChange.emit("profile-detail")
  }
}
