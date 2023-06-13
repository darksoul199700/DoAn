import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateChatRoomDto {

    @ApiProperty()
    @IsString()
    room_name: string

    @ApiProperty()
    @IsString()
    room_type: string

    @ApiProperty()
    @IsDateString()
    create_at: Date
}