import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import type { Request, Response } from "express"

@Catch(HttpException)

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()
        const message = exception.message
        const name = exception.name
        const statusCode = exception.getStatus()


        res.status(statusCode).json({
            statusCode,
            timeStamp: new Date().toISOString(),
            name,
            message,
            path: req.url

        })

    }
}