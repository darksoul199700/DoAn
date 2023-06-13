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
export class NotificationService extends Socket {
  
    constructor(
        private router: Router) { 
            super({url: 'http://localhost:4000/notification', options:{}})
        }

        socket: Socket = new Socket({url: 'http://localhost:4000/notification', options:{}})
        

    sendNotification(senderId, sender, postContent, postId){
        const message = {
            senderId: senderId,
            sender: sender,
            postContent: postContent,
            postId: postId
        }
        this.socket.emit('sendNotification', message);
    }

    receiveNotification(): any{
        return this.socket.fromEvent('sendNotifications');
    }
}