import { Controller, UseGuards, Request, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { MessageService } from './message.service';
import { io } from 'socket.io-client'

@ApiTags('message')
@Controller('message')
export class MessageController {
    constructor(
        private messageService: MessageService
        
    ){}

    @Post('/send-message/:id')
    sendMessage(@Param('id') id: number) {
        const socket = io('localhost:http://localhost:4000')
        socket.emit('events', {name: id})
    }
}
