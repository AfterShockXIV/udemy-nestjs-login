import { LoginModel } from './../models/login.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { RegisterModel } from '../models/register.model';
import { AppService } from '../services/app.service';

@Controller('api/account')
export class AccountController {
    constructor(private service: AppService) { }

    @Post('register') // ลงทะเบียน
    async register(@Body(new ValidationPipe()) body: RegisterModel) {
        return await this.service.onRegister(body);
    }

    @Post('login') //เข้าสู่ระบบ
    async login(@Body(new ValidationPipe()) body: LoginModel) {
        return await this.service.onLogin(body);
    }

}   