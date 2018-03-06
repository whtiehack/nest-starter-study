import {Get, Catch, Controller, HttpStatus, UseFilters, Param, Post, Body, Res, Req, Request, Query} from '@nestjs/common';

import {HttpException, ExceptionFilter,} from '@nestjs/common';
import {ParseIntPipe} from './pipe/parse-int.pipe';

export class NotFoundException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

export class UserNotFoundException extends NotFoundException {
    constructor() {
        super('User not found.');
    }
}

@Catch(UserNotFoundException, NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception, response) {
        console.log('~~~ exception', exception);
        response.status(HttpStatus.NOT_FOUND).send('NotFoundExceptionFilter');
    }
}

@Controller()
@UseFilters(new NotFoundExceptionFilter())
export class AppController {
    @Get('/')
    root(@Res() res) {
    //    throw new NotFoundException('11');
        //return 'Hello@World!';
        res.render('index', { message: '!!!!Hello world!' });
    }

    @Get('/login')
    login(): string {
        return '<h1>login!!!</h1>';
    }

    @Get('/test/:id')
    showId(@Param('id', new ParseIntPipe()) id): string {
        return '<h1>' + id + '</h1>';
    }

    @Post('/postTest')
    getPostData(@Body() body,@Request() req, @Query() query){
        console.log('~~body',body,'query',query);
        return new Promise((resolve,reject)=>{
            let tmp  = '';
            req.on('data',(da)=>{
                tmp+=da;
            });
            req.on('end',()=>{
                console.log('~~ data',tmp);
                resolve(tmp);
            });
            req.on('error',(err)=>{
                console.error(err);
                reject(err);
            })
        });
    }

    @Post()
    postRoot(@Body() body){
        return body;
    }
}


