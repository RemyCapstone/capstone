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
  Heading,
  Flex
} from "@chakra-ui/react";
import { RiBuilding4Line, RiHomeHeartLine, RiStarLine } from "react-icons/ri";
import { getSession } from 'next-auth/react';
import Property from '../../components/Property';

const ProfileDetailsPage = ({ session }) => {
  const name = session.user.firstName + " " + session.user.lastName;
  const joined = new Date(session.user.joined)

  const properties = session.user.savedProps;


  // console.log(properties);

  return (
    <Grid
      h="89vh"
      templateRows="repeat(15, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={2}
      margin={2}
    >
      {/* USER INFORMATION */}
      <GridItem rowSpan={6} colSpan={2} padding={4}>
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
            <Button float="right" size="sm">
              Edit
            </Button>
            <Text fontSize="3xl" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="xl"> {session.user.email} </Text>
            <Text fontSize="md">
              User since&nbsp;
              {`${
                joined.getMonth() + 1
              }/${joined.getDate()}/${joined.getFullYear()}`}{" "}
            </Text>
          </Box>
          <Box padding={3}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={RiBuilding4Line} h={5} w={5} />
                {properties ? <p><b>{properties.filter((p) => p.isRental).length}</b>
                &nbsp;rental properties saved</p> : <p>No rental properties saved</p>}

              </ListItem>
              <ListItem>
                <ListIcon as={RiHomeHeartLine} h={5} w={5} />
                {properties ? <p><b>{properties.filter((p) => !p.isRental).length}</b>&nbsp;homes saved</p> :
                <p>No home properties saved</p>}

              </ListItem>
              <ListItem>
                <ListIcon as={RiStarLine} h={5} w={5} /><b>{session.user.reviews ? session.user.reviews.length : 0}</b> Reviews
              </ListItem>
            </List>
          </Box>
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={5}>
        <Heading size="xl" padding={4}>
          Saved Properties
        </Heading>
      </GridItem>
      {/* PROPERTIES */}
      <GridItem
        rowSpan={14}
        colSpan={5}
        padding={4}
        bg="white"
        overflowY="auto"
      >
        <Flex flexWrap="wrap">
          {properties ? (properties.map((property) => (
            <Property
              property={property}
              key={property.zpid}
              isRental={property.isRental}
            />
          ))) : <p>No properties</p>}

        </Flex>
      </GridItem>

      {/* REVIEWS/REPORTS */}
      <GridItem rowSpan={7} colSpan={2} bg="white"></GridItem>
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