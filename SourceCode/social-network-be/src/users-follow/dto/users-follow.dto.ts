import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UsersFollowDto {

    @ApiProperty()
    @IsString()
    users_follow_id: number

    @ApiProperty()
    create_at: Date
}