import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user._id };
    return this.jwtService.signAsync(payload, {secret: process.env.SECRET_KEY_JWT});
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {secret: process.env.SECRET_KEY_JWT});
  }
}
