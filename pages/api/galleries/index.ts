import { withPrismaClient } from 'middleware/withPrismaClient';

export default withPrismaClient(async (req, res) => {
  try {
    const galleries = await req.prisma.gallery.findMany({
      orderBy: [{ name: 'asc' }],
    });
    return res.status(200).json(galleries);
  } catch (error) {
    console.log(`---------------- Prisma error: `, error);
    return res.status(500).end();
  }
});
