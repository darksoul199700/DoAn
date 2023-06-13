
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true
  });

  app.useStaticAssets(join(__dirname, '..', 'photos'), {
    index: false,
    prefix: '/photos',
} );

  const option = new DocumentBuilder()
    .setTitle('Social_network')
    .setDescription('using for test api')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, option)
  SwaggerModule.setup('', app, document);
  await app.listen(8888);
}
bootstrap();
