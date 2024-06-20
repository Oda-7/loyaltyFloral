import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { RoleService } from 'src/services/role.service';
import { validateRole } from 'src/validator/validateRole';

@Controller('api/role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private prismaService: PrismaService,
  ) {}

  @Get('/all')
  getRoles(): Promise<Roles[]> {
    return this.roleService.roles();
  }

  @Get('/:id')
  getRole(@Param('id') id: string): Promise<Roles | null> {
    const role = this.prismaService.roles.findUnique({
      where: { id: Number(id) },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return this.roleService.role(Number(id));
  }

  @Post('/create')
  createRole(@Body() data: Roles): Promise<Roles> {
    if (validateRole(data.name)) {
      return this.roleService.createRole(data);
    }
    throw new Error('Invalid role');
  }

  @Put('/update')
  updateRole(@Body() data: Roles): Promise<Roles> {
    validateRole(data.name);
    return this.roleService.updateRole({
      where: { id: data.id },
      data,
    });
  }

  @Delete('/delete/:id')
  deleteRole(@Param('id') id: string): Promise<Roles> {
    return this.roleService.deleteRole({ id: Number(id) });
  }
}
