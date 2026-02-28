import { User } from '@/generated/prisma/client';
import { Role } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export class UserDatasource {
  static async create(
    name: string,
    email: string,
    password: string,
    role: Role = Role.user,
  ): Promise<User> {
    return await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcryptjs.hashSync(password),
        role: role,
      },
    });
  }

  static async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}
