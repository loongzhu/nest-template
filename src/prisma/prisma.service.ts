import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name, {
    timestamp: true,
  });

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  content(): string {
    return "PrismaService.content()";
  }

  doSomething(): void {
    this.logger.log("PrismaService.doSomething()");
  }
}
