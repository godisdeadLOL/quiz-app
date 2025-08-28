import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Cats example').setVersion('1.0').build();

  const openApiDoc = cleanupOpenApiDoc(
    SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey, methodKey) => methodKey,
    }),
  );
  SwaggerModule.setup('api', app, openApiDoc);

  const docRaw = JSON.stringify(openApiDoc).replaceAll('_Output', '').replaceAll('Dto', ''); // фикс названий схем
  fs.writeFileSync('../../openapi.json', docRaw);

  app.enableCors({
    exposedHeaders: 'x-session-key',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
