import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import { Session } from './auth/session.entity';
import morganLogger from './logger/morganLogger';
import { AppController } from './app.controller';
import appLogger from './logger';
import config from './app.config';

const sessionSecret = '3e?,0x1b6X2#V]!31z(a';
const cookieAge = 2 * 60 * 60 * 1000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  appLogger.setup();
  morganLogger.setup(app);
  
  const staticAssetPaths = [
    'data/uploaded-files',
    'data/public'
  ];

  for (let index = 0; index < staticAssetPaths.length; index++) {
    const path =  join(__dirname, '..', staticAssetPaths[index]);
    console.log(path);    
    app.useStaticAssets(path);
  }
  
  const sessionRepository = getConnection().getRepository(Session);

  app.use(session({
    store: new TypeormStore({
      cleanupLimit: 2,
      ttl: cookieAge
    }).connect(sessionRepository),
    secret: sessionSecret,
    name: 'hotel-booking',
    resave: false,
    saveUninitialized: false
  }));

  await app.listen(config.httpServerConfig.port);
}
bootstrap();
