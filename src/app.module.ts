import { MemberService } from './services/member.service';
import { MemberController } from './controllers/member.controller';
import { accessTokenSchema } from './schema/access-token.schema';
import { DBAuthenService, DBAuthenStrategy } from './services/db-authen.service';
import { AccountController } from './controllers/account.controller';
import { memberSchema } from './schema/member.schema';
import { AppController } from './controllers/app.controller';
import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthenService, JwtAuthenStrategy } from './services/jwt-authen.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/member_db'),
    MongooseModule.forFeature([
      { name: 'Member', schema: memberSchema },
      { name: 'AccessToken', schema: accessTokenSchema }
    ])
  ],
  controllers: [
    AppController,
    AccountController,
    MemberController
  ],
  providers: [
    AppService,
    DBAuthenService,
    DBAuthenStrategy,
    JwtAuthenService,
    JwtAuthenStrategy,
    MemberService
  ]
})
export class AppModule { }

