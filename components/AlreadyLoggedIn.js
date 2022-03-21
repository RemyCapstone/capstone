import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const AlreadyLoggedIn = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100px"
    >
      <AlertIcon />
      <AlertTitle mr={2}> Already logged in! </AlertTitle>
      <AlertDescription>
        You cannot access this page because you are already logged in.
      </AlertDescription>
    </Alert>
  );
};

export default AlreadyLoggedIn;