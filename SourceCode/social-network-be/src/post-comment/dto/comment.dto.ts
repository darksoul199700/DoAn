import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CommentDto {

    @ApiProperty()
    @IsString()
    postId: number

    @ApiProperty()
    @IsString()
    comment: string

    @ApiProperty()
    @IsDateString()
    create_at: Date
}