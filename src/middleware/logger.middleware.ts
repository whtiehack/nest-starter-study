import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next) => {
            console.log(`logger.middleware: [${args[0]}] Request...`);
            next();
        };
    }
}
