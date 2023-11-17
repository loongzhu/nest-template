import { Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { CatsModule } from "./cats/cats.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [CatsModule, PrismaModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AppGuard],
})
export class AppModule implements NestModule {
  configure() {}
}
