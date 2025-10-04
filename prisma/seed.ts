import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const galleries = Array.from(Array(10).keys()).map((i) => ({
  name: faker.lorem.words(4),
  description: faker.lorem.sentence(),
}));

async function main() {
  console.log('Starting seed...');

  await prisma.gallery.createMany({
    data: galleries,
    skipDuplicates: true,
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
