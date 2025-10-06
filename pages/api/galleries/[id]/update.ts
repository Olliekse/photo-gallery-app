import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    console.log(`--------------- not PATCH, returning 400`);
    return res.status(400).end();
  }

  const id: number = parseInt(req.query.id);
  const { name, description } = req.body;

  const gallery = await prisma.gallery.update({
    where: { id },
    data: { name, description },
  });

  return res.status(200).json(gallery);
}
