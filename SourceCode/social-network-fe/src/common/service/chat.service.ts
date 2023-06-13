import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { createBtwChatRoom } from './backend-api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreateBwtChatRoomDto } from '../dto/create-btw-chat-room.dto';


@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket{
  
  constructor(
    private http: HttpClient,
    private router: Router) { 
      super({url: 'http://localhost:4000/chat', options:{}})
  }

  socket: Socket = new Socket({url: 'http://localhost:4000/chat', options:{}})

  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  token = this.currentUser? this.currentUser.token : null

  httpOption = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
  }

  sendChat(message){
    this.socket.emit('chatNormal', message);
  }

  receiveChat(){
    return this.socket.fromEvent('chatNormal');
  }

  sendChatToFriend(sender: string, sender_id: number , room: string, messages: string, create_at: Date) {
    var message = {
      sender: sender,
      sender_id: sender_id,
      room: room,
      message: messages,
      create_at: create_at
    }
    this.socket.emit('sendMessageToServer', message)
  }

  receiveChatFromFriend(){
    return this.socket.fromEvent('broadcassMessageToClient');
  }

  joinToChatRoom(createBtwChatRoom: CreateBwtChatRoomDto){
    this.socket.emit('joinRoom', createBtwChatRoom)
  }

  isJoinToRoom(): any{
    return this.socket.fromEvent('IsConnect')
  }

  createBtwChatRoom(room_name, room_type, create_at, friend_id) {
    var body = {
      room_name: room_name,
      room_type: room_type,
      create_at: create_at,
      friend_id: friend_id
    }
    return this.http.post<any>(createBtwChatRoom, body, this.httpOption)
  }
}