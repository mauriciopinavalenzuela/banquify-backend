import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()
    .setTitle('API banquify')
    .setDescription('Esta API describe la plataforma banquify')
    .setVersion('1.0.0')
    .addTag('banquify-api')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();