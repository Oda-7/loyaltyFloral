import { Module } from '@nestjs/common';
import { RoleController } from 'src/controllers/role.controller';
import { PrismaService } from 'src/services/prisma.service';
import { RoleService } from 'src/services/role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
