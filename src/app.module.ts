import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataModule } from './modules/data/data.module';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/newsoft';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL), 
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: process.env.CONNECTION_STRING_MONGO,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UserModule, DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
