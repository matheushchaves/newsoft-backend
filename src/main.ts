import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
//import * as morgan from 'morgan';
config(); // Carrega as variáveis de ambiente do arquivo .env

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Morgan
  // app.use(morgan('dev'));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('New Soft API')
    .setDescription('New Soft API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(PORT);
}
bootstrap();
