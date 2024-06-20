import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { RoleModule } from './module/role.module';
import { MessageModule } from './module/message.module';
import { EventsModule } from './module/message.gateway.module';

@Module({
  imports: [UserModule, RoleModule, MessageModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
