import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class createChatRoomMemberDto {
    @ApiProperty()
    @IsString()
    nickname: string

    @ApiProperty()
    @IsNumber()
    user_id: number

    @ApiProperty()
    @IsNumber()
    room_id: number
}