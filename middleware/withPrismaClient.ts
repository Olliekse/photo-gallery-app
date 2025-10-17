import prisma from 'lib/server/prismaClientInstance';

export const withPrismaClient = (handler) => {
  return async (req, res) => {
    try {
      req.prisma = prisma;
      return handler(req, res);
    } catch (e) {
      console.log(`--------------- Prisma error: `, e);
      return res.status(500).end();
    }
  };
};
