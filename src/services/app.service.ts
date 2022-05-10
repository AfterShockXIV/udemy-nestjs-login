import { JwtAuthenService } from './jwt-authen.service';
import { DBAuthenService } from './db-authen.service';
import { IRegister, RoleAccount, ILogin } from './../interfaces/app.interface';
import { IMemberDocument } from './../interfaces/member.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IAccount } from '../interfaces/app.interface';
import { Model } from 'mongoose'
import { generate, verify } from 'password-hash'


@Injectable()
export class AppService {
  constructor(
    private authenService: JwtAuthenService,
    @InjectModel('Member') private MemberCollertion: Model<IMemberDocument>) { }
  //ลงทะเบียน 
  async onRegister(body: IRegister) {
    const count = await this.MemberCollertion.count({ email: body.email });
    if (count > 0) throw new BadRequestException('มี Email นี้ในระบบแล้ว')

    delete body.cpassword
    const model: IAccount = body;
    model.password = generate(model.password)
    model.image = '';
    model.position = '';
    model.role = RoleAccount.Member;
    const modelIIem = await this.MemberCollertion.create(model);
    modelIIem.password = ''
    return modelIIem
  }

  async onLogin(body: ILogin) {
    const member = await this.MemberCollertion.findOne({ email: body.email }) // เช็คในฐานข้อมูล
    if (!member) throw new BadRequestException('ไม่มีผู้ใช้งานในระบบ')
    if (verify(body.password, member.password)) {
      return { accessToken: await this.authenService.generateAccessToken(member) }
    } else {
      throw new BadRequestException('email หรือ รหัสผ่านไม่ถูกต้อง')
    }

  }

}
// async getItem() {
  //   return await this.memberTable.find();
  // }

  // createItem() {
  //   this.memberTable.create([
  //     {
  //       firstname: 'firstname',
  //       lastname: 'lastname',
  //       email: 'email',
  //       password: 'password',
  //       id: '1',
  //       position: 'position',
  //       image: 'image',
  //       role: 2,
  //     }
  //   ])

  // }