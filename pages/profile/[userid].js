import {
  Avatar,
  Box,
  Button,
  Grid, GridItem,
  StackDivider, VStack,
  List, ListIcon, ListItem,
  Text, Heading,
  Flex,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import { RiBuilding4Line, RiHomeHeartLine, RiStarLine } from "react-icons/ri";

import { getSession } from 'next-auth/react';
import Link from 'next/link';

import Property from '../../components/Property';
import { server } from '../../config/index'; // dyanmic absolute routes

// Fetch data
const fetchUserSavedPropertiesHandler = async (id) => {
  const response = await fetch(`${server}/api/user/getSaves`, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

// Functional component
const ProfileDetailsPage = ({ session, savedProps }) => {
  const name = session.user.firstName + " " + session.user.lastName;
  const joined = new Date(session.user.joined)
  const properties = savedProps;

  const noRentalProperties = <p>
    You have no saved rental properties. Search for your next happy place
    <Link href='/search?purpose=for-rent'>
      <Button colorScheme='blue' variant='link' paddingLeft='1'>
        here.
      </Button>
    </Link>
  </p>

  const noHomes = <p>
    You have no saved homes. Search for your next happy place
    <Link href='/search?purpose=for-sale'>
      <Button colorScheme='blue' variant='link' paddingLeft='1'>
        here.
      </Button>
    </Link>
  </p>

  return (
    <Grid
      h="89vh"
      templateRows="repeat(15, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={2}
      margin={2}
    >
      {/* USER INFORMATION */}
      <GridItem rowSpan={10} colSpan={2} padding={4}>
        {/* LEFT COLUMN */}
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
        </VStack>
        <List>
              <ListItem>
                <ListIcon as={RiBuilding4Line} h={5} w={5} />
                {properties ?
                  <p><b>{properties.filter((p) => p.isRental).length}</b>
                  &nbsp;rental properties saved</p>
                    :
                  <p><b>O</b> rental properties saved</p>}
              </ListItem>
              <ListItem>
                <ListIcon as={RiHomeHeartLine} h={5} w={5} />
                {properties ?
                  <p><b>{properties.filter((p) => !p.isRental).length}</b>&nbsp;homes saved</p>
                    :
                  <p><b>0</b> homes saved</p>}
              </ListItem>
              <ListItem>
                <ListIcon as={RiStarLine} h={5} w={5} />
                <p><b>
                    {session.user.reviews ? session.user.reviews.length : 0}
                </b> Reviews</p>
              </ListItem>
            </List>
      </GridItem>
      {/* RIGHT COLUMN */}
      <GridItem rowSpan={1} colSpan={5}>
        <Heading size="xl" padding={4}>
          Saved Properties
        </Heading>
      </GridItem>
      {/* RIGHT COLUMN - USER'S DATABASE STUFF */}
      <GridItem
        rowSpan={14}
        colSpan={5}
        padding={4}
        bg="white"
        overflowY="auto"
      >
        {/* 1 - TABS: SAVED PROPERTIES */}
        <Tabs>
          <TabList>
            <Tab>Rental</Tab>
            <Tab>Home</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                {(properties && properties.length > 0)
                  ?
                  (properties.filter(property => property.isRental).length > 0)
                    ?
                    (properties.filter(property => property.isRental).map((property) => (
                      // User has saved properties, display them.
                      <GridItem>
                        <Property
                          property={property}
                          key={property.zpid}
                          isRental={property.isRental}
                        />
                      </GridItem>
                      )))
                    :
                    noRentalProperties
                :
                noRentalProperties
                }
              </Grid>
            </TabPanel>
            <TabPanel>
            <Flex flexWrap="wrap">
                {(properties && properties.length > 0)
                  ?
                  (properties.filter(property => !property.isRental).length > 0)
                    ?
                    (properties.filter(property => !property.isRental).map((property) => (
                      // User has saved properties, display them.
                        <Property
                          property={property}
                          key={property.zpid}
                          isRental={property.isRental}
                        />
                      )))
                    :
                    noHomes
                :
                noHomes
                }
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </GridItem>

      {/* TO-DO: USER'S REVIEWS */}
      {/* TO-DO: USER'S REPORTS */}
    </Grid>
  );
}

export async function getServerSideProps({ params: { userid }, req }) {
  const session = await getSession({ req });
  const res = await fetchUserSavedPropertiesHandler(userid);
  const data = await res.json();
  const savedProps = await data.savedProperties;

  return {
    props: {
      session: session,
      savedProps: savedProps
    },
  };
}

export default ProfileDetailsPage;