import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { Users } from 'src/users/users.entity';
import { CreateBwtChatRoomDto } from 'src/chat-room/dto/create-btw-chat-room.dto';


@WebSocketGateway(4000,{namespace: 'chat'})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private messageService: MessageService,
    private ChatRoomService: ChatRoomService
  ){}

  @WebSocketServer() server: Server;
    private users = 0;

    async handleConnection(){

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
        console.log('chatGateWay is connecting')
    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('sendMessageToServer')
    async handleMessage(client: Socket, message: {sender: string, sender_id: number ,room: string, message: string, create_at: Date}) {
      Logger.log(message)
      const result = await this.messageService.saveMessage(message.message, message.create_at,message.sender_id, parseInt(message.room))
      Logger.log(result)
      client.broadcast.to(message.room).emit('broadcassMessageToClient', message)
      // this.server.to(message.room).emit('chat-to-client', message.message)
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, createBwtChatRoomDto: CreateBwtChatRoomDto) {
      
      const result = await this.ChatRoomService.createBwtFriendChatRoom(createBwtChatRoomDto)

      if(client.join(`${result.data}`)) {
        const results = {code: 200, message: 'Has success to join this room', room: `${result.data}`}
        const listMessage = await this.messageService.getAllMessage(result.data)
        results['messages'] = listMessage
        this.server.emit('IsConnect', results)
      } else {
        const results = {code: 201, message: 'Has fail to join this room'}
        this.server.emit('IsConnect', results)
      }
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: any) {
      const roomName = room.room

      if(client.leave(roomName)) {
        const result = {code: 200, message: 'Has success to leave this room'}
        this.server.emit('isDisconnect', result)
      } else {
        const result = {code: 201, message: 'Has fail to leave this room'}
        this.server.emit('isDisconnect', result)
      }
    }

    @SubscribeMessage('chatNormal')
    async onChat(client, message){
        client.broadcast.emit('chatNormal', message);
    }
}
