import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { CustomHttpExceptionFilter } from "./utils/exceptionFilters/CustomHTTPExceptionFilter"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as morgan from "morgan"

async function bootstrap(): Promise<void> {
  const port = process.env.PORT ? Number(process.env.PORT) : 80
  const app = await NestFactory.create(AppModule)

  app.use(morgan(":method :url :user-agent :response-time[3] :status"))
  app.useGlobalFilters(new CustomHttpExceptionFilter())

  app.useGlobalFilters(new CustomHttpExceptionFilter())
  if (process.env.ENVIRONMENT != "prod") {
    const config = new DocumentBuilder()
      .setTitle("Service")
      .setDescription("Service description")
      .setVersion("1.0")
      .addBearerAuth(
        { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        "JWT",
      )
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, document)
  }

  await app.listen(port, () =>
    console.log(`Service listening on port: ${port}`),
  )
}

bootstrap()
