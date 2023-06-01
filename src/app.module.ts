import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/newsoft';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
