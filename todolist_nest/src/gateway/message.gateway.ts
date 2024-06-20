import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from 'src/services/message.service';

@WebSocketGateway()
export class MessageGateway implements OnModuleInit {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: any) {
    this.server.emit('onMessage', {
      msg: 'New message',
      content: data,
    });

    console.log(data);
    console.log(data.user_send);
    console.log(data.user_receive);

    // verificator for content Message
    // this.messageService.createMessage(data);

    return data;
  }
}
