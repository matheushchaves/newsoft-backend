import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchema } from './user.schema';

@Module({
  imports: [
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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private userService: UserService) {}

  async onModuleInit() {
    await this.createAdminUserIfNotExists();
  }

  async createAdminUserIfNotExists() {
    const adminEmail = 'admin@newsoft.app';
    const existingUser = await this.userService.findByEmail(adminEmail);

    if (!existingUser) {
      const adminUser = {
        name: 'Admin',
        email: adminEmail,
        password: '1@3$5^7*',
      };

      await this.userService.create(adminUser);
    }
  }
}
