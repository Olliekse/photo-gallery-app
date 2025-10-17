import { Box, Grid, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { create as createPhoto } from 'lib/client/api/Photos';

// Custom typed fetcher with debugging
async function fetcherJson<T>(url: string): Promise<T> {
  console.log('SWR fetching:', url);
  try {
    const response = await fetch(url);
    console.log('SWR response status:', response.status);
    console.log('SWR response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as T;
    console.log('SWR response data:', data);
    return data;
  } catch (error) {
    console.error('SWR fetch error:', error);
    throw error;
  }
}

interface PhotoItem {
  id: number;
  url: string;
  caption?: string | null;
}

interface GalleryData {
  id: number;
  name: string;
  photos: PhotoItem[];
}

export default function GalleryShowPage() {
  const router = useRouter();
  const galleryId = router.isReady ? Number(router.query.id) : null;

  const {
    data: gallery,
    error,
    mutate,
  } = useSWR<GalleryData>(
    galleryId ? `/api/galleries/${galleryId}/show` : null,
    (url: string) => fetcherJson<GalleryData>(url)
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

  const PhotoUploader = dynamic(
    () => import('components/PhotoUploader').then((m) => m.PhotoUploader),
    { ssr: false }
  );

  const handleUploadComplete = async (file: {
    cdnUrl: string;
    uuid: string;
    width?: number;
    height?: number;
  }) => {
    if (!galleryId) return;
    try {
      await createPhoto(galleryId, {
        url: file.cdnUrl,
        uploadcarePublicId: file.uuid,
        width: file.width ?? 0,
        height: file.height ?? 0,
      });
      await mutate();
    } catch (e) {
      console.error('Failed to create photo', e);
    }
  };

  return (
    <>
      <VStack align="stretch" gap={4} mb={4}>
        <PhotoUploader onUploadComplete={handleUploadComplete} />
      </VStack>
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
