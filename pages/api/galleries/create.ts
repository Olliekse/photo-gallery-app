import { HTTPMethod } from 'lib/shared/types/HTTPMethod';
import withHTTPMethodRequired from 'middleware/withHTTPMethodRequired';
import { withPrismaClient } from 'middleware/withPrismaClient';

export default withHTTPMethodRequired(HTTPMethod.POST)(
  withPrismaClient(async (req, res) => {
    try {
      const { name, description } = req.body;

      const gallery = await req.prisma.gallery.create({
        data: {
          name,
          description,
        },
      });
      return res.status(200).json(gallery);
    } catch (error) {
      console.log(`----------------- error creating gallery: `, error);
      return res.status(500).end();
    }
  })
);
