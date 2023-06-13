import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class PostLikeDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    postId: number

    @ApiProperty()
    @IsDateString()
    createAt: Date

}