import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CreateBwtChatRoomDto } from 'src/common/dto/create-btw-chat-room.dto';
import { baseApi } from 'src/common/service/backend-api';
import { ChatService } from 'src/common/service/chat.service';
import { UsersService } from 'src/common/service/users.service';

@Component({
  selector: 'app-messenger-screen',
  templateUrl: './messenger-screen.component.html',
  styleUrls: ['./messenger-screen.component.css']
})
export class MessengerScreenComponent implements OnInit {


  constructor(
    private chatService: ChatService,
    private usersService: UsersService
  ) { 
    
  }


  currentUser: any
  currentUserName: string =''
  message: string = '';
  listMessages: any[];

  currentRoom: string =''
  testArray: any[] = []
  isInARoom: boolean = false
  isConnect = false

  baseApiUrl: String;

  
  ngOnInit(): void {
    this.baseApiUrl = baseApi;

    this.chatService.receiveChatFromFriend().subscribe((data) => {
      // this.messages.push(message);
      const message: any = data
      const listMessage = $('#chat-list')
      listMessage.prepend(
        `<div class="comment-box">
          <span>${message.message}</span>
        </div>
        `
      )
    });

    this.usersService.getAllFollow().subscribe((follow) => {
      console.log(follow)
      if(follow.code == 200) {
        follow.data.map(x => {
          this.testArray.push(x)
        })
      }
      
    })

    this.usersService.usersDetail().subscribe((response) => {
      if (response.code === 200) {
        const user = response.data;
        this.currentUser = user
        this.currentUserName = user.username
      }
    })
  }

  addChat(event){
    if(event.keyCode == 13 || event.which == 13) {
      this.chatService.sendChat(this.message);
      console.log('aloalo')
      if(this.message !== '') {
        const create_at = new Date()
        this.chatService.sendChatToFriend(this.currentUserName , this.currentUser.users_id, this.currentRoom, this.message, create_at);
        let listMessage = $('#chat-list')
        listMessage.prepend(
          `<div class="comment-box right">
            <span>${this.message}</span>
          </div>
          `
        )
        listMessage.scrollTop($('#chat-list')[0].scrollHeight)
        this.message = '';
      }
    }   
  }

  joinToChatRoom(friend_id, event) {
    const create_at = new Date();
    const createBtwChatRoom: CreateBwtChatRoomDto = {
      room_name: '',
      room_type: 'BTW_FRIEND',
      create_at: create_at,
      friend_id: friend_id,
      users_id: this.currentUser.users_id
    }
    this.chatService.joinToChatRoom(createBtwChatRoom);
    this.chatService.isJoinToRoom().subscribe(value => {
      if (event && this.currentRoom === value.room) return;
      this.listMessages = [];
      this.currentRoom = value.room;
      value.messages.data.map(x => {
        this.listMessages.push(x);
      });
    })
    $(event.target).parent().parent().find('div.active').removeClass('active')
    $(event.target).parent().addClass('active')
    this.isInARoom = true
  }


}
