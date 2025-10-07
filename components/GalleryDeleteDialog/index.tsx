import {
  Button,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@chakra-ui/react';

export interface GalleryDeleteDialogProps {
  isOpen: boolean;
  onCloseClick: () => unknown;
  onConfirmClick: (e, id) => unknown;
  galleryId: number;
}

export const GalleryDeleteDialog = ({
  isOpen,
  onCloseClick,
  onConfirmClick,
  galleryId,
}: GalleryDeleteDialogProps) => {
  const composedOnConfirmClick = (e) => {
    onConfirmClick(e, galleryId);
  };

  return (
    <DialogRoot
      open={isOpen}
      role="alertdialog"
      onOpenChange={(details) => {
        if (!details.open) onCloseClick();
      }}
    >
      <DialogBackdrop />
      {/* @ts-expect-error - Chakra UI v3 Dialog components have type issues with children */}
      <DialogPositioner>
        {/* @ts-expect-error - Chakra UI v3 Dialog content has children typing issues */}
        <DialogContent>
          <DialogHeader>
            {/* @ts-expect-error - Chakra UI v3 Dialog title type issue */}
            <DialogTitle>Delete this gallery</DialogTitle>
          </DialogHeader>
          <DialogBody>Are you sure? This can&apos;t be undone.</DialogBody>
          <DialogFooter>
            <Button onClick={onCloseClick} mr={3}>
              Cancel
            </Button>
            <Button colorPalette="red" onClick={composedOnConfirmClick}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};
