import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT, // Substitua pela sua chave secreta real
    });
  }

  async validate(payload: any) {
    // Aqui você pode realizar a lógica para validar e obter o usuário com base no payload do token
    // Retorne o usuário ou os dados necessários para a autenticação
    return { id: payload.sub, username: payload.username };
  }
}
