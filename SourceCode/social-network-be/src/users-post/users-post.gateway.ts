import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersFollow } from "src/users-follow/users-follow.entity";
import { UsersNotificationService } from "src/users-notification/users-notification.service";
import { Users } from "src/users/users.entity";
import { getRepository } from "typeorm";
import { NOTIFICATION_ENUM } from "../common/enum/notification.enum"

@WebSocketGateway(4000, {namespace: 'notification'})
export class UsersPostGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    
    constructor(
        private usersNotificationService: UsersNotificationService
    ){}
    @WebSocketServer() server: Server

    handleConnection() {
        const message = 'connecting'
        this.server.emit('connect', message)
        console.log('notification-getway')
    }
    
    handleDisconnect() {
        const message = 'disconnect'
        this.server.emit('disconnect', message)
    }

    @SubscribeMessage('sendNotification')
    async sendNotification(client: Socket, message: {senderId: number, sender: string, postContent: string, postId: number }){
        console.log(message)
        let sendNotification = await getRepository(UsersFollow).createQueryBuilder('p')
        .where('p.users_hasfollow_id = :id', {id: message.senderId})
        .getMany()
        sendNotification.map(x => {
            this.usersNotificationService.addUsersNotification(message.postContent, NOTIFICATION_ENUM.POST_CONTENT, message.postId, x.usersId)
        })
        client.broadcast.emit('sendNotifications', message);
    }
}