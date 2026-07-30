import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { SUCCESS_MESSAGE } from "../decorator/success-message.decorator";


export class ResponseInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log(this.reflector)
        const message = 'Request successful'

        return next.handle().pipe(map((data) => ({
            success: true,
            message,
            ...(data !== undefined && { data }),
        })))
    }
}