import type { NextApiRequest, NextApiResponse } from 'next';
import type { PrismaClient } from '@prisma/client';
import { withPrismaClient } from 'middleware/withPrismaClient';

export default withPrismaClient(
  async (
    req: NextApiRequest & { prisma: PrismaClient },
    res: NextApiResponse
  ) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    try {
      const galleryId = parseInt(req.query.id as string);
      const { url, uploadcarePublicId, width, height, caption } = req.body;

      const photo = await req.prisma.photo.create({
        data: {
          galleryId,
          url,
          uploadcarePublicId,
          width,
          height,
          caption: caption ?? null,
        },
      });

      return res.status(200).json(photo);
    } catch (error) {
      console.log('----- error creating photo', error);
      return res.status(500).end();
    }
  }
);
