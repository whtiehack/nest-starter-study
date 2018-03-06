import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as express from 'express';
import {HttpExceptionFilter} from "./http-exception.filter";
import {CatsController} from "./cats/cats.controller";
import {AppController, NotFoundExceptionFilter} from "./app.controller";
import {CatsService} from "./cats/cats.service";
import {CatsModule} from "./cats/cats.module";
import * as path from "path";

// const instance = express();
// instance.use('/public', express.static('public'));

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule/*, instance as any*/);
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    // global-scoped exception filter.
    //   app.useGlobalFilters(new HttpExceptionFilter());
    // const notFoundExceptionFilter = app
    //     .select(ApplicationModule)
    //     .select(CatsModule);
    // console.log(`!~~ geted not found filter' ${notFoundExceptionFilter}`,notFoundExceptionFilter);
    await app.listen(3000);
}

bootstrap();
