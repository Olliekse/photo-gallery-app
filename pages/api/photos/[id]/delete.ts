import type { NextApiRequest, NextApiResponse } from 'next';
import type { PrismaClient } from '@prisma/client';
import { withPrismaClient } from 'middleware/withPrismaClient';
import { getUploadcareAuthHeader } from 'lib/server/Uploadcare';

export default withPrismaClient(
  async (
    req: NextApiRequest & { prisma: PrismaClient },
    res: NextApiResponse
  ) => {
    if (req.method !== 'DELETE') {
      return res.status(405).end();
    }

    try {
      const id = parseInt(req.query.id as string);

      const photo = await req.prisma.photo.findUnique({ where: { id } });
      if (!photo) {
        return res.status(404).end();
      }

      // Delete from Uploadcare via REST
      const auth = getUploadcareAuthHeader();
      const deleteResponse = await fetch(
        `https://api.uploadcare.com/files/${photo.uploadcarePublicId}/`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/vnd.uploadcare-v0.7+json',
            Authorization: auth,
          },
        }
      );

      if (!deleteResponse.ok && deleteResponse.status !== 404) {
        // If it's already gone (404), proceed to remove from DB; otherwise, propagate error
        const text = await deleteResponse.text();
        console.log(
          '----- Uploadcare delete failed',
          deleteResponse.status,
          text
        );
        return res.status(502).end();
      }

      // Remove from DB
      await req.prisma.photo.delete({ where: { id } });

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log('----- error deleting photo', error);
      return res.status(500).end();
    }
  }
);
