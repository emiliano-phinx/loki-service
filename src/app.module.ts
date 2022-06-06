import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import config from "../ormconfig"
import { ConfigModule } from "@nestjs/config"
import { ChatModule } from "./chat/chat.module"
import configuration from "./configuration/configuration"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(config),
    ChatModule,
  ],
})
export class AppModule {}
