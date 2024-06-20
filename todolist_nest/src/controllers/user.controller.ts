import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user.service';
import { validateUser } from 'src/validator/validateUser';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  @Get('/all')
  getAllUsers(): Promise<Users[]> {
    return this.userService.users();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): Promise<Users | null> {
    return this.userService.user(Number(id));
  }

  @Post('/create')
  createUser(@Body() data: Users): Promise<Users> {
    if (validateUser(data)) {
      return this.userService.createUser(data);
    }

    throw new Error('Invalid user');
  }

  @Put('/update')
  updateUser(@Body() data: Users): Promise<Users> {
    if (validateUser(data)) {
      return this.userService.updateUser({
        where: { id: data.id },
        data,
      });
    }
    throw new Error('Invalid user');
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string): Promise<Users> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
