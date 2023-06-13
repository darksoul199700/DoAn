import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateUsersDetailDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    truename: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    gender: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phonenumber:string;
}