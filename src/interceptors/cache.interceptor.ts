import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Interceptor()
export class CacheInterceptor implements NestInterceptor {
    async intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Promise<Observable<any>> {
        const isCached = true;
        if (isCached) {
            return Observable.of([{a:1},{b:'c'}]);
        }
        return stream$;
    }
}