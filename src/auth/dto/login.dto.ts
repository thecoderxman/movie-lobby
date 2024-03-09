import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
  
    @IsNotEmpty()
    readonly password: string;
}
