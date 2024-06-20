import { Prisma, Messages } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async messages(): Promise<Messages[]> {
    return this.prisma.messages.findMany();
  }

  async message(id: number): Promise<Messages | null> {
    return this.prisma.messages.findUnique({
      where: { id },
    });
  }

  async createMessage(
    data: Prisma.MessagesUncheckedCreateInput,
  ): Promise<Messages> {
    const userSend = data.user_send;
    const userReceive = data.user_receive;
    const userSendExist = await this.prisma.users.findUnique({
      where: { id: userSend },
    });
    const userReceiveExist = await this.prisma.users.findUnique({
      where: { id: userReceive },
    });

    if (!userSendExist) {
      throw new Error('UserSend not found');
    } else if (!userReceiveExist) {
      throw new Error('UserReceive not found');
    }
    data.date = new Date();

    return this.prisma.messages.create({ data });
  }

  async updateMessage(params: {
    where: Prisma.MessagesWhereUniqueInput;
    data: Prisma.MessagesUpdateInput;
  }): Promise<Messages> {
    const { where, data } = params;

    return this.prisma.messages.update({
      data,
      where,
    });
  }

  async deleteMessage(
    where: Prisma.MessagesWhereUniqueInput,
  ): Promise<Messages> {
    return this.prisma.messages.delete({
      where,
    });
  }
}
