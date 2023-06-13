import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { baseApi } from 'src/common/service/backend-api';
import { UsersService } from 'src/common/service/users.service';

@Component({
  selector: 'app-people-suggess-screen',
  templateUrl: './people-suggess-screen.component.html',
  styleUrls: ['./people-suggess-screen.component.css']
})
export class PeopleSuggessScreenComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router,
  ) { }
  
  isFollow: boolean = false
  array: any = []
  baseApiUrl: string;

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((value) => {
      this.array = value.data;
    });

    this.baseApiUrl = baseApi;
  }

  async followOtherUser(users_follow_id: number, event){
    const create_at = new Date()
    await this.userService.followOtherUser(users_follow_id, create_at).subscribe(value => {
      if(value.code === 200) {
        $(event.target).toggleClass('active')
        if($(event.target).hasClass('active')) {
          $(event.target).text('Đã theo dõi')
        } else {
          $(event.target).text('Theo dõi')
        }
      }
      
    })
    
  }

  peopleDetail(id){
    this.router.navigate(['people/detail'], { queryParams: { id:  id} });
  }

}
