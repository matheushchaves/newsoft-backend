import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { join } from 'path';
import * as express from 'express';

config(); // Carrega as variáveis de ambiente do arquivo .env

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('New Soft API')
    .setDescription('New Soft API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Configuração do Express para servir o arquivo swagger.json
  const expressApp = express();
  expressApp.use(express.static(join(__dirname, '../swagger')));
  app.use('/swagger-json', expressApp);

  await app.listen(PORT);
}
bootstrap();
