import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Interceptor()
export abstract class CacheInterceptor implements NestInterceptor {
    protected abstract readonly isCached: () => boolean;


    async intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Promise<Observable<any>> {
        if (this.isCached()) {
            return Observable.of([{a:1},{b:'c'}]);
        }
        return stream$;
    }
}