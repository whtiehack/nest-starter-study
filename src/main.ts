import {NestApplication, NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as express from 'express';
import {HttpExceptionFilter} from "./http-exception.filter";
import {CatsController} from "./cats/cats.controller";
import {AppController, NotFoundExceptionFilter} from "./app.controller";
import {CatsService} from "./cats/cats.service";
import {CatsModule} from "./cats/cats.module";
import * as path from "path";
import {WsAdapter} from "./gateway/common/ws-adapter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {UwsWebSocketAdapter} from "./gateway/common/uwsAdapter";
import * as http from "http";
const instance = express();
const server = http.createServer(instance);
// instance.use('/public', express.static('public'));

async function bootstrap() {
    const app:NestApplication = await NestFactory.create(ApplicationModule, instance as any/*, instance as any*/);
 //   app.setGlobalPrefix('v1');
    app.useWebSocketAdapter(new WsAdapter(server));
  //  app.useWebSocketAdapter(new UwsWebSocketAdapter(server ,''));
    app.use('/public',express.static(path.join(__dirname,'../', 'public')));
    app.set('views', path.join(__dirname,'../', 'views'));
    app.set('view engine', 'jade');
    // global-scoped exception filter.
    //   app.useGlobalFilters(new HttpExceptionFilter());
    // const notFoundExceptionFilter = app
    //     .select(ApplicationModule)
    //     .select(CatsModule);
    // console.log(`!~~ geted not found filter' ${notFoundExceptionFilter}`,notFoundExceptionFilter);

    const options = new DocumentBuilder()
        .setTitle('Cats example')
    //    .setBasePath('/v1')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
    await app.init();
    server.listen(3000,(err)=>console.log('~ run as http://127.0.0.1:3000',err));
 //   await app.listen(3000,()=>console.log('~ run as http://127.0.0.1:3000'));
}

bootstrap();
