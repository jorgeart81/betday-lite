import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';

import bcryptjs from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@google.com',
    name: 'Demo Admin',
    password: bcryptjs.hashSync('123456'),
    role: 'admin',
  },
  {
    email: 'user@google.com',
    name: 'Demo User',
    password: bcryptjs.hashSync('123456'),
    role: 'user',
  },
];

export async function main() {
  if (process.env.NODE_ENV === 'production') return;
  
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
