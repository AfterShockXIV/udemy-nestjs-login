import { SearchModel } from './../models/serch.model';
import { changePasswordModel } from './../models/change-password.model';
import { MemberService } from './../services/member.service';
import { ValidationPipe } from './../pipes/validation.pipe';
import { ProfileModel } from './../models/profile.model';
import { IMemberDocument } from './../interfaces/member.interface';
import { Controller, Get, Req, UseGuards, Post, Body, Query } from "@nestjs/common";
import {  Request } from "express";
import { AuthGuard } from '@nestjs/passport';

@Controller('api/member')
@UseGuards(AuthGuard('jwt'))
export class MemberController {
    constructor(private service: MemberService) { }

    @Get('data') //เข้าสู่ระบบ
    getUserLogin(@Req() req: Request) {
        const userLogin: IMemberDocument = req.user as any;
        // userLogin.image = userLogin.image ? 'http://localhost:3000' + userLogin.image : ''
        userLogin.password = '';
        return userLogin
    };

    @Post('profile')//แก้ไขข้อมูลส่วน
    updateProfile(@Req() req: Request, @Body(new ValidationPipe()) body: ProfileModel) {
        const user = req.user  as  any
        return this.service.onUpdateProfile(user.id, body);
        // return req.user
    };

    @Post('change-password') //เปลี่ยนรหัสผ่าน
    changPassword(@Req() req: Request, @Body(new ValidationPipe()) body:changePasswordModel){
        const user = req.user  as  any
        return this.service.onChangePassword(user.id ,body)
    }


    @Get() //แสดงข้อมูลสมาชิก
    showMember(@Query(new ValidationPipe()) query:SearchModel){
        query.startPage = parseInt(query.startPage as any)
        query.limitPage = parseInt(query.limitPage as any)
        return this.service.getMemberItem(query)
    }

}   