import { ILogin } from './../interfaces/app.interface';
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginModel implements ILogin{
    @IsNotEmpty()
    @IsEmail()
    email : string 

    @IsNotEmpty()
    password : string

    @IsNotEmpty()
    remember: boolean;

}