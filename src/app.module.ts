import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authModule } from './oauth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBURI),
    authModule,
  ],
})
export class AppModule {}
