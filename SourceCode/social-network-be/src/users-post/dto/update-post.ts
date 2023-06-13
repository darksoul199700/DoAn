import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class UpdatePostDto {
    @ApiProperty()
    @IsString()
    caption: string

    @ApiProperty()
    photo: JSON

    @ApiProperty()
    @IsDateString()
    update_at: Date


}