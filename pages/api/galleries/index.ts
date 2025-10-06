import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function handler(req, res) {
  async function main() {
    console.log(
      'Fetching galleries from database URL:',
      process.env.DATABASE_URL
    );

    const galleries = await prisma.gallery.findMany({
      orderBy: [{ name: 'asc' }],
    });

    console.log('Found galleries:', galleries.length, galleries);
    return res.status(200).json(galleries);
  }

  main()
    .catch((e) => {
      console.log(`------------- error with request: `, e);
      return res.status(500).end();
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
