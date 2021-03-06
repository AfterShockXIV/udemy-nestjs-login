import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
export const BASE_DIR = __dirname;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(BASE_DIR + '/uploads'))
  app.enableCors(); //เปิดเพื่อให้เชื่อมต่อกับ frontend ได้ 
  await app.listen(3000);
}
bootstrap();
