import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Messages } from '@prisma/client';
import { MessageService } from 'src/services/message.service';
import { PrismaService } from 'src/services/prisma.service';
import { validateMessage } from 'src/validator/validateMessage';

@Controller('api/message')
export class MessageController {
  constructor(
    private messageService: MessageService,
    private prismaService: PrismaService,
  ) {}

  @Get('/all')
  getMessages(): Promise<Messages[]> {
    return this.messageService.messages();
  }

  @Get('/:id')
  getMessage(id: number): Promise<Messages | null> {
    const message = this.prismaService.messages.findUnique({
      where: { id },
    });
    if (!message) {
      throw new Error('Message not found');
    }

    return this.messageService.message(id);
  }

  @Get('/user-send/:id')
  getMessageUserSend(@Param('id') id: number): Promise<Messages[]> {
    const user = this.prismaService.users.findUnique({
      where: { id },
    });
    const message = this.prismaService.messages.findMany({
      where: { user_send: id },
    });

    if (!user) {
      throw new Error('UserSend not found');
    } else {
      if (!message) {
        throw new Error('Message not found');
      }
    }

    return this.prismaService.messages.findMany({
      where: { user_send: id },
    });
  }

  @Get('/user-receive/:id')
  getMessageUserReceive(@Param('id') id: number): Promise<Messages[]> {
    const user = this.prismaService.users.findUnique({
      where: { id },
    });
    const message = this.prismaService.messages.findMany({
      where: { user_receive: id },
    });

    if (!user) {
      throw new Error('UserReceive not found');
    } else {
      if (!message) {
        throw new Error('Message not found');
      }
    }

    return this.prismaService.messages.findMany({
      where: { user_receive: id },
    });
  }

  @Post('/create')
  createMessage(@Body() data: Messages): Promise<Messages> {
    validateMessage(data);
    if (data.user_send == data.user_receive) {
      throw new Error('UserSend and UserReceive cannot be the same');
    }
    return this.messageService.createMessage(data);
  }

  @Put('/update')
  updateMessage(@Body() data: Messages): Promise<Messages> {
    if (data.user_send == data.user_receive) {
      throw new Error('UserSend and UserReceive cannot be the same');
    }
    validateMessage(data);
    return this.messageService.updateMessage({
      where: { id: data.id },
      data,
    });
  }

  @Delete('/delete/:id')
  deleteMessage(@Param('id') id: number): Promise<Messages> {
    const message = this.prismaService.messages.findUnique({
      where: { id },
    });
    if (!message) {
      throw new Error('Message not found');
    }
    return this.messageService.deleteMessage({ id });
  }
}
