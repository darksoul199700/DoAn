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
export class CommentService extends Socket {
  
    constructor(
        private router: Router) { 
            super({url: 'http://localhost:4000/comment', options:{}})
        }

        socket: Socket = new Socket({url: 'http://localhost:4000/comment', options:{}})
        

    sendComment(messages, sender, post){
        const message = {
            messages: messages,
            sender: sender,
            post: post
        }
        this.socket.emit('sendComment', message);
    }

    receiveComment(): any{
        return this.socket.fromEvent('sendBackComment');
    }

    receiveChatFromFriend(){
        return this.socket.fromEvent('broadcassMessageToClient');
    }
}