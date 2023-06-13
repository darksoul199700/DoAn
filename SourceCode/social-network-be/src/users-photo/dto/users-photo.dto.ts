import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UsersPhotoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    photo_url: string;

    @ApiProperty()
    @IsDateString()
    create_at: Date;

    @ApiProperty()
    @IsDateString()
    update_at: Date;

}