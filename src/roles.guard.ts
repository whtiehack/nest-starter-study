
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';
// http://127.0.0.1:3000/cats?auth=ture

// In fact, the guard which returns false forces Nest to throw a HttpException. This exception can be caught by the exception filter.


@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}

    canActivate(dataOrRequest, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return dataOrRequest.query['auth'] == 'true';
     //    const { parent, handler } = context;
     //    const roles = this.reflector.get<string[]>('roles', handler);
     //    if (!roles) {
     //        return true;
     //    }
     //    const user = dataOrRequest.user;
     //    const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
     //    return user && user.roles && hasRole();

    }
}

@Guard()
class TestGuard {

}