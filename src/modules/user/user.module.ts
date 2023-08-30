import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchema } from './user.schema';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule
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
