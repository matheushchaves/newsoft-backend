import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nome-do-banco-de-dados';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
