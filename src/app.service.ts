import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'New Soft - Teste de conhecimento - Back-end';
  }
}
