import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Strategy , ExtractJwt} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthen } from './../interfaces/authen.interface';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IMemberDocument } from 'src/interfaces/member.interface';
import { JwtPayload, sign } from 'jsonwebtoken'
import { Model } from 'mongoose'
@Injectable()
export class JwtAuthenService implements IAuthen {
 constructor (@InjectModel('Member') private MemberCollertion: Model<IMemberDocument>) { }

  //สร้าง secretkey
  static secretKey: string = 'NodeJs Member Workshop'

  //สร้าง Token
  async generateAccessToken(member: IMemberDocument) {
    const payload = { email: member.email }
    return sign(payload, JwtAuthenService.secretKey, { expiresIn: 60 * 60 })
  }

  //ยืนยันตัวตน
  async validateUser({email}): Promise<IMemberDocument> {
    try {
      return this.MemberCollertion.findOne({email})
    } catch (ex) {}
    return null
  }

}

@Injectable()
export class JwtAuthenStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService : JwtAuthenService){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : JwtAuthenService.secretKey,
    });
    
  }

  async validate(payload:{email:string}, done : Function){
    const user = await this.authService.validateUser(payload);
  
    if(!user){
      return done(new UnauthorizedException('Unauthorized please login!') , false);
    }
    done(null,user)
  }
}
