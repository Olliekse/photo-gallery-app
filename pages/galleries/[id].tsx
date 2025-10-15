import { Box, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// Custom fetcher with debugging
const fetcher = async (url: string) => {
  console.log('SWR fetching:', url);
  try {
    const response = await fetch(url);
    console.log('SWR response status:', response.status);
    console.log('SWR response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('SWR response data:', data);
    return data;
  } catch (error) {
    console.error('SWR fetch error:', error);
    throw error;
  }
};

export default function GalleryShowPage() {
  const router = useRouter();
  const galleryId = router.isReady ? Number(router.query.id) : null;

  const { data: gallery, error } = useSWR(
    galleryId ? `/api/galleries/${galleryId}/show` : null,
    fetcher
  );

  console.log('Router is ready:', router.isReady);
  console.log('Gallery ID:', galleryId);
  console.log('Gallery data:', gallery);
  console.log('SWR error:', error);

  if (!router.isReady) {
    return <div>Loading router...</div>;
  }

  if (error) {
    return <div>Error loading gallery: {error.message}</div>;
  }

  if (!gallery) {
    return <div>Loading gallery...</div>;
  }

  if (!gallery.photos || gallery.photos.length === 0) {
    return <div>No photos found in this gallery</div>;
  }

  const rowHeight = { base: 200, md: 300 };

  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
        }}
      >
        {gallery.photos.map(({ id, url, caption }) => {
          return (
            <Box height={rowHeight} key={id} pos="relative">
              <Image
                key={id}
                src={url}
                fill={true}
                style={{ objectFit: 'cover' }}
                alt={caption || `Gallery image ${id}`}
              />
            </Box>
          );
        })}
      </Grid>
    </>
  );
}
