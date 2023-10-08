import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name, {
    timestamp: true,
  });

  content(): string {
    return 'PrismaService.content()';
  }

  doSomething(): void {
    this.logger.log('PrismaService.doSomething()');
  }
}
