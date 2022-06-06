import { Catch } from "@nestjs/common";

@Catch()
export class CustomHttpExceptionFilter {
  catch(exception, host) {
    console.error({ exception });
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json(exception.response);
  }
}
