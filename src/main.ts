import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { TransformInterceptor } from './common/response';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:8000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(
    session({
      secret: 'lin',
      rolling: true,
      name: 'hongyi.li',
      cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    })
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle('博客接口')
    .setDescription('博客接口')
    .setVersion('1.0')
    .addTag('博客')
    .build();
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, options)
  );
  await app.listen(3001);
}
bootstrap();
