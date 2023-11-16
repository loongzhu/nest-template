import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common"
import * as dayjs from "dayjs"
import { Request, Response } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name, {})

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const { url, method } = request

    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()

    const message = exception.message || "unknown mistake"

    const { code, error } = exception.getResponse() as any

    this.logger.error(
      `Http Status: ${status}, Method: ${method}, URL: ${url}, Error Message: ${JSON.stringify(
        message,
      )}`,
    )

    response.status(status).json({
      statusCode: code || status,
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      path: request.url,
      error,
      message,
    })
  }
}
