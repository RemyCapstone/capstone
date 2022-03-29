import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  StackDivider,
  Text,
  VStack,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { RiBuilding4Line, RiHomeHeartLine, RiStarLine } from "react-icons/ri";
import { getSession } from 'next-auth/react';

const ProfileDetailsPage = ({ session }) => {
  const name = session.user.firstName + " " + session.user.lastName;
  const joined = new Date(session.user.joined)

  return (
    <Grid
      h="85vh"
      templateRows="repeat(9, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={2}
      margin={2}
    >
      {/* USER INFORMATION */}
      <GridItem rowSpan={4} colSpan={2} padding={4}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
        >
          <Box paddingTop={2} paddingBottom={4}>
            <Avatar
              bg="teal.500"
              fontWeight="bold"
              size="lg"
              name={name}
              src={session.user.imageUrl ? session.user.imageUrl : null}
            />
            <Button float="right" size="sm"> Edit </Button>
            <Text fontSize="3xl" fontWeight="bold"> {name} </Text>
            <Text fontSize="xl"> {session.user.email} </Text>
            <Text fontSize="md"> User since {`${joined.getMonth() + 1}/${joined.getDate()}/${joined.getFullYear()}`} </Text>
          </Box>
          <Box padding={3}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={RiBuilding4Line} h={5} w={5} /> X properties saved
              </ListItem>
              <ListItem>
                <ListIcon as={RiHomeHeartLine} h={5} w={5} /> X homes saved
              </ListItem>
              <ListItem>
                <ListIcon as={RiStarLine} h={5} w={5} /> X Reviews
              </ListItem>
            </List>
          </Box>
        </VStack>
      </GridItem>

      {/* PROPERTIES */}
      <GridItem rowSpan={9} colSpan={5} bg="papayawhip"></GridItem>
      {/* USER STATISTICS
      <GridItem rowSpan={1} colSpan={2} bg="blue"> */}

      {/* </GridItem> */}

      {/* REVIEWS/REPORTS */}
      <GridItem rowSpan={5} colSpan={2} bg="blue"></GridItem>
    </Grid>
  );
}


export async function getServerSideProps({ params: { userid }, req }) {
  const session = await getSession({ req });
  
  return {
    props: {
      session: session,
    },
  };
}

export default ProfileDetailsPage;