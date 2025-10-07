import {
  Button,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Textarea,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

interface GalleryFormData {
  name: string;
  description: string;
}

interface GalleryCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: GalleryFormData) => void;
}

export const GalleryCreateModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
}: GalleryCreateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GalleryFormData>({
    defaultValues: { name: '', description: '' },
  });


  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => {
        console.log('Dialog onOpenChange triggered:', details);
        if (!details.open) {
          onClose();
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBackdrop />
        {/* @ts-expect-error - Chakra UI v3 Dialog components have type issues with children */}
        <DialogPositioner>
          {/* @ts-expect-error - Chakra UI v3 Dialog content has children typing issues */}
          <DialogContent
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            maxW="500px"
            mx="auto"
            my="10vh"
            p={0}
            position="relative"
            zIndex={1000}
          >
            {/* @ts-expect-error - Chakra UI v3 Dialog close trigger typing issue with asChild */}
            <DialogCloseTrigger asChild>
              <IconButton
                aria-label="Close dialog"
                position="absolute"
                top="16px"
                right="16px"
                size="sm"
                bg="white"
                color="gray.500"
                border="2px solid"
                borderColor="blue.200"
                _hover={{ bg: 'gray.50', borderColor: 'gray.300' }}
              >
                <FaTimes />
              </IconButton>
            </DialogCloseTrigger>
            <DialogHeader p={6} pb={4}>
              {/* @ts-expect-error - Chakra UI v3 Dialog title type issue */}
              <DialogTitle>Create New Gallery</DialogTitle>
            </DialogHeader>
            <DialogBody p={6} py={4}>
              <VStack gap={4} align="stretch">
                <Box>
                  <label htmlFor="name">Name</label>
                  <Input
                    id="name"
                    placeholder="Enter gallery name"
                    {...register('name', {
                      required: 'This field is required',
                      minLength: { value: 2, message: 'At least 2 characters' },
                    })}
                  />
                  {errors.name && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.name.message}
                    </Text>
                  )}
                </Box>

                <Box>
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    placeholder="Enter gallery description"
                    rows={4}
                    {...register('description')}
                  />
                </Box>
              </VStack>
            </DialogBody>
            <DialogFooter p={6} pt={4}>
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                mr={3}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="ghost" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </form>
    </DialogRoot>
  );
};
