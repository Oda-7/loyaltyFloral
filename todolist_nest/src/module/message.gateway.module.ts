import { Module } from '@nestjs/common';
import { MessageGateway } from 'src/gateway/message.gateway';
import { MessageService } from 'src/services/message.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [MessageGateway, MessageService, PrismaService],
})
export class EventsModule {}
