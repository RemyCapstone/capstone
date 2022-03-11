import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { useRouter } from 'next/router';


import { fetchZillowApi, propertyDetailOptions, propertyImageOptions} from "../../utils/fetchZillowApi";
import ImageScrollbar from '../../components/ImageScrollBar';

import Map from '../../components/Map/Map';



const PropertyDetailsPage = ({propertyDetails, propertyImages}) => {

    //break down property details fetched data into these parts
    const {address, bathrooms, bedrooms, brokerageName, description, homeStatus, latitude, longitude, 
        livingArea, listingProvider, livingAreaUnits, livingAreaValue, price, priceHistory, schools, 
        streetAddress, timeOnZillow, url, yearBuilt, zipcode, homeType} = propertyDetails;


      const location = {
        address: streetAddress,
        lat: latitude,
        lng: longitude,
      } // our location object from earlier
          
    const {images} = propertyImages;

    const router = useRouter();
    console.log(propertyDetails)
    //console.log(propertyImages)

    return (
        <Box maxWidth='1000px' margin='auto' p='4'>
          {/* if the listing has images, we can generate an image scroller*/}
          {images && <ImageScrollbar data={images}/>}
          <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems='center'>
              <Text fontWeight='bold' fontSize='3xl'>USD {price}{homeStatus === "FOR_RENT" ? '/ a month' : ''}</Text>
              <Spacer/>
              <Flex alignItems='center' p='1' justifyContent='space-between' w='330px' color='blue.400'>
                <Text fontWeight='bold' fontSize='2xl'>{bedrooms}</Text>
                <FaBed size={30}/> <Text fontWeight='bold' fontSize='2xl'>| {bathrooms} </Text> <FaBath size={30} /> <Text fontWeight='bold' fontSize='2xl'>| {millify(livingArea)} sqft </Text> <BsGridFill size={30}/>
              </Flex>
            </Flex>
            <Box marginTop='2'>
              <Text fontSize='2xl' marginBottom='2' fontWeight='semibold'>
                {brokerageName} {streetAddress}
                <br/>
                {address.city}, {address.state} {zipcode}
              </Text>
            <Text lineHeight='2' color='gray.600'>{description}</Text>
            </Box>

            <br />

           <Map location={location}></Map>

            <br />


            <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
              <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                  <Text>Type</Text>
                  <Text fontWeight='bold'>{homeType}</Text>
                </Flex>
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                  <Text>Purpose</Text>
                  <Text fontWeight='bold'>{homeStatus === "FOR_RENT" ? "FOR RENT" : "FOR SALE"}</Text>
                </Flex>
                {brokerageName && (
                  <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                    <Text>Brokerage Name</Text>
                    <Text fontWeight='bold'>{brokerageName}</Text>
                  </Flex>
                )}
                {listingProvider.agentName && (
                  <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                    <Text>Listing Provider:</Text>
                    <Text fontWeight='bold'>{listingProvider.agentName}</Text>
                  </Flex>
                )}
                {yearBuilt && (
                  <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                    <Text>Year Built:</Text>
                    <Text fontWeight='bold'>{yearBuilt}</Text>
                  </Flex>
                )}
                {timeOnZillow && (
                  <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                    <Text>Listed for:</Text>
                    <Text fontWeight='bold'>{timeOnZillow}</Text>
                  </Flex>
                )}
            </Flex>

        </Box>
                  
        </Box>
    )
}

export async function getServerSideProps({ params: { zpid } }) {
    //generate the fetch object for the property details and images
  const myProperty = propertyDetailOptions(zpid);
  const myImages = propertyImageOptions(zpid);

  //make calls
  const data = await fetchZillowApi(myProperty)
  //prevent throttling errors
  await new Promise(resolve => setTimeout(resolve, 500));
  const images = await fetchZillowApi(myImages);
  
  return {
    props: {
      propertyDetails: data,
      propertyImages: images
    },
  };
}

export default PropertyDetailsPage;