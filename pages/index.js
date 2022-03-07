import Banner from "../components/Banner";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseListingURL, baseOptions, defaultSearch, fetchZillowListings } from "../utils/fetchZillowApi";
import Property from "../components/Property";

const HomePage = ({propertiesForRent, propertiesForSale}) => {
  //console.log(propertiesForRent, propertiesForSale);
  //propertiesForRent.forEach(e => console.log(e.zpid, typeof propertiesForRent[0].zpid))
  let usablePropertiesForRent = propertiesForRent.filter(property => !property.zpid.includes(".") && !property.address.includes('(undisclosed Address)'))
  //console.log(usablePropertiesForRent)

  if (usablePropertiesForRent.length > 6) {
    usablePropertiesForRent = usablePropertiesForRent.slice(0,6);
  }

  //const usablePropertiesForSale = propertiesForSale.filter(property => !property.zpid.includes(".") && !property.address.includes('(undisclosed Address)'))
  //console.log(usablePropertiesForSale)
  
  return(
    <Box> {/*Box is a div in @chakra-UI */}
      {/* A component that gives a "banner" type look, if you want to change the UI for this please check the Banner component*/}
      <Banner 
        purpose="VIEW RENTAL PROPERTIES"
        title1="Browse All Apartments"
        title2="For NYCers!"
        desc1="Explore available rental units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="/search?purpose=for-rent"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/broker-hero-ddf3a4.jpg"
      />
      {/* display each property listing on the home page, if you want to change the UI please check the Property component*/}
      <Flex flexWrap="wrap">
        {usablePropertiesForRent.map((property) => <Property property={property} key={property.zpid} isRental={true}/>)}
      </Flex>


      {/* Repeated everything on top, just for sale properties*/}
      <Banner 
        purpose="VIEW SALE PROPERTIES"
        title1="Find, Buy & Own Condos"
        title2="For NYCers!"
        desc1="Explore available for sale units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="search?purpose=for-sale"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/nyc-apartments-for-3200-lic-6fadb8.jpg"
      />
      <Flex flexWrap="wrap">
        {/* propertiesForSale.map((property) => <Property property={property} key={property.id}/>) */}
      </Flex>
    </Box>
  ) 
};

//this makes the initial api calls when we load our home page, these get passed to the HomePage component so we dont need to use any useEffect hooks
export async function getStaticProps(){

  //note this is our base URL from fetchZillowApi.js, then we load Brooklyn locations (our default search) and status type such as if its a rental or a for sale apartment
  const propertyForRent = await fetchZillowListings(baseOptions)

  //do this after to avoid extra api calls
  //const propertyForSale = await fetchZillowListings(`${baseListingURL}`)

  //these are the props that you see passed in the HomePage component
  return {
    props: {
      //the ? means that if our search result was success and if it exists, then get the .props property of the object that is return, 
      //.props in our case is the listings of all the apartments that match our search
      propertiesForRent: propertyForRent?.props,
      //propertiesForSale: propertyForSale?.props
    }
  }
}

export default HomePage;