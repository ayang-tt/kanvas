import body_parser from 'body-parser';
const { raw } = body_parser;
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { BEHIND_PROXY } from './constants.js';

export async function runKanvasServer() {
  let cors: any = false;
  if (process.env.LOCAL_CORS === 'true') {
    cors = {
      credentials: true,
      origin: true,
    };
  }

  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: cors,
    logger: ['log', 'warn', 'error'],
  });
  setupKanvasServer(server);

  const port = process.env['KANVAS_API_PORT'] || 3000;
  await server.listen(port);
  console.log('Listening on ', port);
}

export function setupKanvasServer(server: NestExpressApplication) {
  server.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  server.use('/payment/stripe-webhook', raw({ type: 'application/json' }));
  if (BEHIND_PROXY) {
    server.set('trust proxy', 1);
  }

  server.enableShutdownHooks();
}
