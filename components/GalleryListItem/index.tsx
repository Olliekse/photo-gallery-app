import { Flex, Heading } from '@chakra-ui/react';

export const GalleryListItem = ({ name, key }) => (
  <Flex
    width="100%"
    direction="row"
    key={key}
    borderRadius={10}
    boxShadow="md"
    p={3}
  >
    <Heading size="md">{name}</Heading>
  </Flex>
);
