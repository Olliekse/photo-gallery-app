import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id: number = parseInt(req.query.id);

  async function main() {
    const gallery = await prisma.gallery.findUnique({
      where: { id },
    });

    return res.status(200).json(gallery);
  }
  return main()
    .catch((e) => {
      console.log(`---------- error retrieving gallery: `, e);
      return res.status(500).end();
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
