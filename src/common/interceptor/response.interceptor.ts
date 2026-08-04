import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { SUCCESS_MESSAGE } from "../decorator/success-message.decorator";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const message = this.reflector.get(SUCCESS_MESSAGE, context.getHandler()) ?? 'Request successful'

        return next.handle().pipe(map((data) => ({
            success: true,
            message,
            ...(data !== undefined && { data }),
        })))
    }
}