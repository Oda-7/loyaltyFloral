import { Module } from '@nestjs/common';
import { MessageController } from 'src/controllers/message.controller';
import { MessageService } from 'src/services/message.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
