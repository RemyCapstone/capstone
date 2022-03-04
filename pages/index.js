import Banner from "./components/Banner";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

const HomePage = () => {
  return(
    <Box>
      <Banner 
        purpose="VIEW RENTAL PROPERTIES"
        title1="Browse All Apartments"
        title2="For NYCers!"
        desc1="Explore available rental units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="/search/purpose=for-rent"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/broker-hero-ddf3a4.jpg"
      />
      <Flex flexWrap="wrap">
        {/* Fetch properties and display*/}
      </Flex>
      <Banner 
        purpose="VIEW SALE PROPERTIES"
        title1="Find, Buy & Own Condos"
        title2="For NYCers!"
        desc1="Explore available for sale units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="/search/purpose=for-sale"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/nyc-apartments-for-3200-lic-6fadb8.jpg"
      />
      <Flex flexWrap="wrap">
        {/* Fetch properties and display*/}
      </Flex>
    </Box>
  ) 
};

export default HomePage;