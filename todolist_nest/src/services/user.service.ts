import { Prisma, Users } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
// import { BcryptService } from './bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    // private bcrypt: BcryptService,
    // private roleService: RoleService,
  ) {}

  async users(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async user(id: number): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UsersUncheckedCreateInput): Promise<Users> {
    let role = await this.prisma.roles.findFirst({
      where: {
        name: 'member',
      },
    });
    if (!role) {
      role = await this.prisma.roles.create({
        data: {
          name: 'member',
        },
      });
    }

    const userEmail = await this.prisma.users.findFirst({
      where: { email: data.email },
    });
    if (userEmail) {
      throw new Error('Email already exists');
    }

    data.role = role.id;
    // data.password = await this.bcrypt.hashPassword(data.password);

    return this.prisma.users.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;

    const user = await this.prisma.users.findUnique({
      where: { id: where.id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const email = String(data.email);
    if (email) {
      const userEmail = await this.prisma.users.findFirst({
        where: { email: email },
      });
      if (userEmail) {
        throw new Error('Email already exists');
      }
    }

    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where,
    });
    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.users.delete({
      where,
    });
  }
}
