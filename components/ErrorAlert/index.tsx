import { Alert, CloseButton } from '@chakra-ui/react';

export interface ErrorAlertProps {
  children: React.ReactNode;
  onCloseClick?: (e) => void;
}

const defaultOnCloseClick = () => {};

export const ErrorAlert = ({
  children,
  onCloseClick = defaultOnCloseClick,
}: ErrorAlertProps) => {
  return (
    <Alert.Root status="error" mb={3} position="relative">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title mr={2}>Oops!</Alert.Title>
        <Alert.Description>{children}</Alert.Description>
      </Alert.Content>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onCloseClick}
      />
    </Alert.Root>
  );
};
