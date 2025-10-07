import { useEffect, useState } from 'react';

import useSWR from 'swr';
import {
  Heading,
  Box,
  VStack,
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { GalleryListItem } from 'components/GalleryListItem';
import { GalleryCreateModal } from 'components/GalleryCreateModal';
import { Prisma } from '@prisma/client';
import { create, update, destroy } from 'lib/client/api/Galleries';
import { ErrorAlert } from 'components/ErrorAlert';
import { GalleryEditModal } from 'components/GalleryEditModal';
import { GalleryDeleteDialog } from 'components/GalleryDeleteDialog';

// Define the Gallery type for better TypeScript support
interface Gallery {
  id: string;
  name: string;
}

const fetcher = async (url: string): Promise<Gallery[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data as unknown as Gallery[];
};

export default function DashboardPage() {
  const {
    data: galleries,
    isValidating: dashboardIsLoading,
    error: dashboardFetchError,
    mutate: mutateGalleries,
  } = useSWR(`/api/galleries`);

  const {
    open: isGalleryCreateOpen,
    onClose: onGalleryCreateClose,
    onOpen: onGalleryCreateOpen,
  } = useDisclosure();

  const {
    isOpen: isGalleryEditOpen,
    onClose: onGalleryEditClose,
    onOpen: onGalleryEditOpen,
  } = useDisclosure();

  const {
    isOpen: isGalleryDeleteOpen,
    onClose: onGalleryDeleteClose,
    onOpen: onGalleryDeleteOpen,
  } = useDisclosure();

  const [currentGalleryForEditing, setCurrentGalleryForEditing] =
    useState(null);

  const [currentGalleryForDeletion, setCurrentGalleryForDeletion] =
    useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    onGalleryEditOpen();
  }, [onGalleryEditOpen, currentGalleryForEditing]);

  if (dashboardIsLoading) {
    return <h1>Loading dashboard...</h1>;
  }

  if (dashboardFetchError) {
    return <h1>Error loading the dashboard.</h1>;
  }

  const handleGalleryEdit = (e: React.MouseEvent, gallery) => {
    e.preventDefault();
    setCurrentGalleryForEditing(gallery);
  };

  const handleGalleryEditSubmit = async (id, gallery) => {
    try {
      await update(id, gallery);
      mutateGalleries();
    } catch (error) {
      setError('An error occurred while creating the gallery.');
    } finally {
      onGalleryEditClose();
    }
  };

  const handleGalleryDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setCurrentGalleryForDeletion(id);
    onGalleryDeleteOpen();
  };

  const handleGalleryDeleteSubmit = async (e, id) => {
    e.preventDefault();

    try {
      await destroy(id);
      mutateGalleries();
    } catch (error) {
      setError('An error occurred while deleting the gallery.');
    } finally {
      onGalleryDeleteClose();
    }
  };

  const handleGalleryCreateSubmit = async (
    gallery: Prisma.GalleryCreateInput
  ): Promise<void> => {
    try {
      await create(gallery);
      mutateGalleries();
    } catch (error) {
      setError('An error occurred while creating the gallery.');
    } finally {
      onGalleryCreateClose();
    }
  };

  function handleErrorAlertClose(e: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Box
      m="0 auto"
      p={5}
      maxWidth={{
        sm: '100%',
        md: '100%',
        lg: '40em',
        xl: '50em',
        '2xl': '74em',
      }}
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Heading>My Dashboard</Heading>
        <Button
          onClick={onGalleryCreateOpen}
          mr={4}
          bg="gray.100"
          color="black"
        >
          + Gallery
        </Button>
      </Flex>

      {error && (
        <ErrorAlert onCloseClick={handleErrorAlertClose}>{error}</ErrorAlert>
      )}

      <VStack gap={5}>
        {galleries?.map((gallery) => (
          <GalleryListItem
            name={gallery.name}
            key={gallery.id}
            href={`/galleries/${gallery.id}`}
            onDeleteClick={(e) => handleGalleryDelete(e, gallery)}
            onEditClick={(e) => handleGalleryEdit(e, gallery)}
          />
        ))}
      </VStack>

      <GalleryCreateModal
        isOpen={isGalleryCreateOpen}
        onClose={onGalleryCreateClose}
        onSubmit={handleGalleryCreateSubmit}
      />

      {currentGalleryForEditing && (
        <GalleryEditModal
          isOpen={isGalleryEditOpen}
          onClose={onGalleryEditClose}
          onSubmit={handleGalleryEditSubmit}
          galleryId={currentGalleryForEditing?.id}
          defaultValues={currentGalleryForEditing}
        />
      )}

      {currentGalleryForDeletion && (
        <GalleryDeleteDialog
          isOpen={isGalleryDeleteOpen}
          onClose={onGalleryDeleteClose}
          onSubmit={handleGalleryDeleteSubmit}
          galleryId={currentGalleryForDeletion?.id}
        />
      )}
    </Box>
  );
}
