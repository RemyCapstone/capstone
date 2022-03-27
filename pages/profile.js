import { useSession } from "next-auth/react";
import Profile from "../components/Profile"
// import { useRouter } from "next/router";
// import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

// const NotAuthorized = () => {
//   return (
//     <Alert
//       status="error"
//       variant="subtle"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       textAlign="center"
//       height="100px"
//     >
//       <AlertIcon />
//       <AlertTitle mr={2}> Not Authorized! </AlertTitle>
//       <AlertDescription>
//         You cannot access this page because you are not logged in.
//       </AlertDescription>
//     </Alert>
//   );
// }
const ProfilePage = () => { 
  // required: true will redirect the user to the login page if not signed in
  const { data: session, status } = useSession({required: true});
  
  // if (session === undefined) 
  //   return <NotAuthorized />
  return <Profile />
}
export default ProfilePage;