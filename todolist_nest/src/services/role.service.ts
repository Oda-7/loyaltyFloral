import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Roles } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async roles(): Promise<Roles[]> {
    return this.prisma.roles.findMany();
  }

  async role(id: number): Promise<Roles | null> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    });
    if (!role) {
      throw new Error('Role not found');
    }

    return this.prisma.roles.findUnique({
      where: { id },
    });
  }

  async createRole(data: Prisma.RolesCreateInput): Promise<Roles> {
    const role = await this.prisma.roles.findFirst({
      where: { name: data.name },
    });

    if (role) {
      throw new Error('Role already exists');
    }

    return this.prisma.roles.create({ data });
  }

  async updateRole(params: {
    where: Prisma.RolesWhereUniqueInput;
    data: Prisma.RolesUpdateInput;
  }): Promise<Roles> {
    const { where, data } = params;

    const role = await this.prisma.roles.findUnique({
      where,
    });
    if (!role) {
      throw new Error('Role not found');
    }
    const roleName = String(data.name);
    const roleExist = await this.prisma.roles.findFirst({
      where: { name: roleName },
    });
    if (roleExist) {
      throw new Error('Role already exists');
    }

    return this.prisma.roles.update({
      data,
      where,
    });
  }

  async deleteRole(where: Prisma.RolesWhereUniqueInput): Promise<Roles> {
    const role = await this.prisma.roles.findUnique({
      where,
    });
    if (!role) {
      throw new Error('Role not found');
    }

    return this.prisma.roles.delete({
      where,
    });
  }
}
