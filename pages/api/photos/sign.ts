import type { NextApiRequest, NextApiResponse } from 'next';
import {
  generateUploadcareSignature,
  uploadcareConfig,
} from 'lib/server/Uploadcare';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const expire = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes
    const signature = generateUploadcareSignature(expire);

    return res.status(200).json({
      publicKey: uploadcareConfig.publicKey,
      expire,
      signature,
    });
  } catch (error) {
    console.log('----- error signing upload request', error);
    return res.status(500).end();
  }
}
