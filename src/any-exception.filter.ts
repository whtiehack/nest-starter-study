

import { ExceptionFilter, Catch } from '@nestjs/common';


/*
Catch everything
To handle every occurred exception, you may leave the parentheses empty (  @Catch()):
 */
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
    catch(exception, response) {
        response
            .status(500)
            .json({
                statusCode: 500,
                message: `It's a message from the exception filter`,
            });
    }
}