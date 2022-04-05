import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const AuthError = ({title, desc}) => {
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
      <AlertTitle mr={2}> {title} </AlertTitle>
      <AlertDescription>
        {desc}
      </AlertDescription>
    </Alert>
  );
};

export default AuthError;