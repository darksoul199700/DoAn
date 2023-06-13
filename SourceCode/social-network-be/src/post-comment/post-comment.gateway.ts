import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway(4000, {namespace: 'comment'})
export class PostCommentGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server

    handleConnection() {
        const message = 'connecting'
        this.server.emit('connect', message)
    } 

    handleDisconnect() {
        const message = 'disconnect'
        this.server.emit('disconnect', message)
    }

    @SubscribeMessage('sendComment')
    async onComment(client: Socket, message: {messages: string, sender: string, post: number}){
        console.log(message)
        client.broadcast.emit('sendBackComment', message);
    }

}