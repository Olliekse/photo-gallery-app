import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    console.log(`---------- not DELETE, returning 400`);
    return res.status(400).end();
  }

  const id: number = parseInt(req.query.id);

  async function main() {
    const json = await prisma.gallery.delete({
      where: { id },
    });

    return res.status(200).json(json).end();
  }

  return main()
    .catch((e) => {
      console.log(`--------------- error deleting gallery: `, e);
      return res.status(500).end();
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
