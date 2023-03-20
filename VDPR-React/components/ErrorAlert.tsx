import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

interface ErrorAlertProps {
  error: string | null;
  setError: (error: string | null) => void;
}

export default function ErrorAlert({ error, setError }: ErrorAlertProps) {
  return (
    <Alert status="error" my={8}>
      <AlertIcon />
      {error}
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setError(null)}
      />
    </Alert>
  );
}
