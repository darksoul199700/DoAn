import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsJSON, IsString } from "class-validator";

export class SendPostDto {
    @ApiProperty()
    @IsString()
    caption: string

    @ApiProperty()
    photo: JSON

    @ApiProperty()
    @IsDateString()
    create_at: Date


}