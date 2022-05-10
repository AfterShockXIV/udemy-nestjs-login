import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(): string {
    return 'Hello Nestjs,Nodejs API'
  }


  // getItem(): object {
  //   return this.appService.getItem();
  // }

  // @Post()
  // post(): void{
  //   return this.appService.createItem();
  // }
}
