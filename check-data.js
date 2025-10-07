const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkData() {
  try {
    const galleries = await prisma.gallery.findMany();
    console.log('Found galleries:', galleries.length);
    console.log('Gallery data:', galleries);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
