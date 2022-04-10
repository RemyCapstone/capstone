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
import { fetchZillowApi } from "../../utils/fetchZillowApi";
import { recommendPropSearch } from "../../utils/recommendPropAlgo";

import Property from '../../components/Property';
import { server } from '../../config/index'; // dyanmic absolute routes
import { useState } from "react";

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

// fetch reviews that this user has made
const fetchUserReviewsHandler = async(id) => {
  const response = await fetch(`${server}/api/fetchUserReviews`, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data =  await response.json();
  return data.reviews || null;
};

// Functional component
const ProfileDetailsPage = ({ session, savedProps, recoproperties, reviews }) => {
  const name = session.user.firstName + " " + session.user.lastName;
  const joined = session.user.joined ? new Date(session.user.joined) : null;
  const properties = savedProps;
  let recommended = recoproperties;

  console.log("user reviews:", reviews)
  
  //filter out properties we already saved
  for(let i=0; i<properties.length; i++){
    recommended = recommended.filter(e => e['zpid'] != properties[i]['zpid'])
  }

  let usableProperties = recommended.filter(property => !property.zpid.includes(".") && !property.address.includes('(undisclosed Address)'))
  console.log(usableProperties);
  const iterations = Math.ceil(usableProperties.length / 3);
  const currentPage = Math.floor(Math.random() * iterations);
  let limit = usableProperties.length <= 3*(currentPage+1) ? usableProperties.length : 3*(currentPage+1);
  

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
    <>
    <Grid
      h="86vh"
      w="1300px"
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
            {joined ?
            <Text fontSize="md">
              User since&nbsp;
              {`${
                joined.getMonth() + 1
              }/${joined.getDate()}/${joined.getFullYear()}`}{" "}
            </Text>
            :
            <></>
            }
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
                    {reviews ? reviews.length : 0}
                </b> Reviews</p>
              </ListItem>
            </List>
      </GridItem>
      {/* RIGHT COLUMN */}
      <GridItem rowSpan={1} colSpan={5}>
        <Heading size="xl" padding={4} paddingTop={0}>
          Saved Properties
        </Heading>
      </GridItem>
      {/* RIGHT COLUMN - USER'S DATABASE STUFF */}
      <GridItem
        rowSpan={14}
        colSpan={5}
        padding={4}
        paddingTop={0}
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
              <Flex flexWrap="wrap">
                {(properties && properties.length > 0)
                  ?
                  (properties.filter(property => property.isRental).length > 0)
                    ?
                    (properties.filter(property => property.isRental).map((property) => (
                      // User has saved properties, display them.
                      <GridItem key={property.zpid}>
                        <Property
                          property={property}
                          isRental={property.isRental}
                        />
                      </GridItem>
                      )))
                    :
                    noRentalProperties
                :
                noRentalProperties
                }
              </Flex>
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


    {/* recommended props */}
    {properties && usableProperties.length > 0 &&
      <Box w='100%' padding={5}>
        <Text fontWeight={'bold'} fontSize='2xl'>Recommended Properties For You</Text>
        <Flex w='1280px' h={'400px'} border='2px' borderColor='gray.300' borderRadius={5} p={3}>
          {usableProperties.slice(3*currentPage, limit).map((property) => <Property property={property} key={property.zpid} isRental={true}/>)}
        </Flex>
      </Box>
    }
    </>
  );
}

export async function getServerSideProps({ params: { userid }, req }) {
  // console.log(userid)
  const session = await getSession({ req });

  let savedProps = [];
  let fetchedProperties = [];
  let reviews = [];
  if (session) {
    const res = await fetchUserSavedPropertiesHandler(session.user);
    // console.log('res userid', res)
    const data = await res.json();
    savedProps = await data.savedProperties;
    if(savedProps.length > 0){
      const options = recommendPropSearch(savedProps);
      fetchedProperties = await fetchZillowApi(options)
    }
    
    reviews = await fetchUserReviewsHandler(session.user.email);
  }

  return {
    props: {
      session: session,
      savedProps: savedProps,
      recoproperties: fetchedProperties?.props || [],
      reviews : reviews
    },
  };
}

export default ProfileDetailsPage;