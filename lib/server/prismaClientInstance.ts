import { PrismaClient } from '@prisma/client';

let prisma;
const options = {};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options);
} else {
  if (typeof global['prisma'] === 'undefined') {
    global['prisma'] = new PrismaClient(options);
  }
  prisma = global['prisma'];
}

export default prisma;
