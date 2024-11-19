import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IRegisterUser } from '../interfaces';

const prisma = new PrismaClient();

export class AuthRepository {

  async findByUsername(username: string) {
    return prisma.user.findFirst({
      where: { username },
    });
  }

  async register(userData: IRegisterUser) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        name: userData.name
      },
    });
  }

}
