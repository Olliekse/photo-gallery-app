import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const galleries = Array.from(Array(10).keys()).map((i) => ({
  name: faker.lorem.words(4),
  description: faker.lorem.sentence(),
}));

const galleryData = Array.from(Array(10).keys()).map((i) => ({
  name: faker.lorem.words(4),
  description: faker.lorem.sentence(),
}));

const createGallery = async (g) => {
  // Your actual UploadCare images
  const uploadcareImages = [
    {
      url: 'https://5zr71v3idd.ucarecd.net/0cbab88b-ca42-4219-83ab-80bc2cb0fcda/images2.jpeg',
      publicId: '0cbab88b-ca42-4219-83ab-80bc2cb0fcda',
      width: 800,
      height: 600,
    },
    {
      url: 'https://5zr71v3idd.ucarecd.net/64542e2b-34ae-4660-9177-a7ba6d559485/examplelukeoslizlo.jpg',
      publicId: '64542e2b-34ae-4660-9177-a7ba6d559485',
      width: 600,
      height: 800,
    },
    {
      url: 'https://5zr71v3idd.ucarecd.net/0f83fc65-859a-4268-8b5c-f035670854eb/examplemandahansen.jpg',
      publicId: '0f83fc65-859a-4268-8b5c-f035670854eb',
      width: 700,
      height: 500,
    },
    {
      url: 'https://5zr71v3idd.ucarecd.net/18593b81-6384-4e8d-8e25-9a13b71482c7/examplegoodfaces.jpg',
      publicId: '18593b81-6384-4e8d-8e25-9a13b71482c7',
      width: 900,
      height: 600,
    },
    {
      url: 'https://5zr71v3idd.ucarecd.net/0da3dbf2-daca-4c38-ad43-59bdb3000b87/examplezdenekmachacek.jpg',
      publicId: '0da3dbf2-daca-4c38-ad43-59bdb3000b87',
      width: 500,
      height: 700,
    },
  ];

  const photoData = Array.from(Array(10).keys()).map((i) => {
    // Cycle through your actual images
    const imageIndex = i % uploadcareImages.length;
    const selectedImage = uploadcareImages[imageIndex];

    return {
      caption: faker.lorem.sentence(),
      url: selectedImage.url,
      uploadcarePublicId: selectedImage.publicId,
      width: selectedImage.width,
      height: selectedImage.height,
    };
  });

  const galleryDataWithPhotos = {
    ...g,

    photos: {
      create: photoData,
    },
  };

  await prisma.gallery.create({ data: galleryDataWithPhotos });
};

async function main() {
  await Promise.all(galleryData.map((g) => createGallery(g)));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
