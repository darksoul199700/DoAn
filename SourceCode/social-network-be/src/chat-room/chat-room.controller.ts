import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatRoomService } from './chat-room.service';

@ApiTags('message')
@Controller('chat-room')
export class ChatRoomController {

    constructor(
        private chatRoomService: ChatRoomService
    ){}
}
