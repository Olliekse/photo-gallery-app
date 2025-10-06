import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).end();
  }

  const { name, description } = req.body;

  async function main() {
    const gallery = await prisma.gallery.create({
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(gallery);
  }

  return main()
    .catch((e) => {
      console.log(`--------------- error creating gallery: `, e);
      return res.status(500).end();
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
