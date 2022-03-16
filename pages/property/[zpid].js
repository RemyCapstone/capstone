import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Stack, HStack, VStack } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdFavoriteBorder, MdStarRate, MdLaunch } from 'react-icons/md';
import millify from 'millify';
import { useRouter } from 'next/router';

import { fetchZillowApi, propertyDetailOptions, propertyImageOptions} from "../../utils/fetchZillowApi";
import ImageScrollbar from '../../components/ImageScrollBar';

import Map from '../../components/Map/Map';
import WalkScore from '../../components/WalkScore';
import PriceHistoryTable from '../../components/PriceHistory/PriceHistoryTable';



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

    let bedWord = 'Beds';
    if(bedrooms == 1){
        bedWord = 'Bed';
    }

    let bathWord = 'Baths';
    if(bathrooms == 1) {
        bathWord = 'Bath'
    }

    const router = useRouter();
    console.log(propertyDetails)
    //console.log(propertyImages)

    return (
        <Box maxWidth='1000px' margin='auto' p='4'>
          {/* if the listing has images, we can generate an image scroller*/}
          {images && <ImageScrollbar data={images}/>}

          <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems='center'>
              <Text fontWeight='bold' fontSize='3xl'>${price}{homeStatus === "FOR_RENT" ? '/mo' : ''}</Text>
              <Spacer/>
              <Flex alignItems='center' p='1' justifyContent='space-between' w='400px' color='blue.400'>
                <FaBed size={30}/> <Text fontWeight='bold' fontSize='2xl'>{bedrooms} {bedWord} |</Text> <FaBath size={30} /> <Text fontWeight='bold' fontSize='2xl'> {bathrooms} {bathWord} </Text> <Text fontWeight='bold' fontSize='2xl'>| </Text><BsGridFill size={30}/> <Text fontWeight='bold' fontSize='2xl'> {millify(livingArea)} sqft </Text>
              </Flex>
            </Flex>
            <Box marginTop='2'>
              <Text fontSize='2xl' marginBottom='2' fontWeight='semibold'>
                {brokerageName} {streetAddress}
                <br/>
                {address.city}, {address.state} {zipcode}
              </Text>
              {/*These buttons don't do anything atm, will put in functionality later*/}
              <HStack spacing='24px'>
                <Button leftIcon={<MdFavoriteBorder />} colorScheme='blue' size='lg' variant='outline'>
                  Save
                </Button>

                <Button leftIcon={<MdStarRate />} colorScheme='blue' size='lg' variant='outline'>
                  Review
                </Button>

                <Button leftIcon={<MdLaunch />} colorScheme='blue' size='lg' variant='outline'>
                  Apply
                </Button>
              </HStack>
              <Text lineHeight='2' color='gray.600'>{description}</Text>
            </Box>



            <br />

            <Flex>
              <Box w='50%'>
                <Map location={location}></Map>
                <WalkScore long={longitude} lat={latitude} address={streetAddress}/>
              </Box>
              <Box w='50%' paddingLeft={10}>
                {/* insert price history chart here*/}
                <PriceHistoryTable data={priceHistory}/>
              </Box>
            </Flex>


            <br /><br />


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