import { Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import { FaWindowClose, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

export interface GalleryListItemProps {
  name: string;
  href: string;
  onDeleteClick: (e: React.MouseEvent) => void;
  onEditClick: (e: React.MouseEvent) => void;
}

export const GalleryListItem = ({
  name,
  href,
  onDeleteClick,
  onEditClick,
}: GalleryListItemProps) => (
  <Flex
    width="100%"
    justifyContent="space-between"
    direction="row"
    borderRadius={10}
    boxShadow="sm"
    p={3}
  >
    <Heading size="md">
      <Link href={href}>{name}</Link>
    </Heading>
    <HStack gap="5px">
      <IconButton
        aria-label="Edit this gallery&#39;s name and description"
        bg="gray.100"
        color="black"
        _hover={{ bg: 'gray.300' }}
        onClick={onEditClick}
      >
        <FaEdit />
      </IconButton>
      <IconButton
        aria-label="Delete this gallery"
        bg="gray.100"
        color="black"
        _hover={{ bg: 'red.300' }}
        onClick={onDeleteClick}
      >
        <FaWindowClose />
      </IconButton>
    </HStack>
  </Flex>
);
