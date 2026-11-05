import { PrismaClient } from '@prisma/client';

// One client per process, also across hot reloads in development.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
