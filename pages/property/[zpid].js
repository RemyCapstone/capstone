import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Stack, HStack, VStack, useToast } from '@chakra-ui/react'
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

import { useEffect, useState, useRef } from 'react';
import {geoOptions, fetchGeoSearch} from '../../utils/geoSearch'
import { registeredOptions, fetchOpenApi } from "../../utils/hpdViolations";
import Violations from '../../components/Violations/Violations';
import { getSession } from 'next-auth/react';
import Reviews from '../../components/Reviews/Reviews';

const saveHandler = async(property, user) => {
  // console.log('Saved!', property,  '\n', user)
  const response = await fetch('/api/saveProperty', {
    method: 'POST',
    body: JSON.stringify([property, user]),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log(data);
}

const fetchUserHandler = async (id) => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data.user);
  return data.user;
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop+500)   

  
const PropertyDetailsPage = ({propertyDetails, propertyImages, session, zpid}) => {
    const toast = useToast();
    const reviewRef = useRef(null)
  
    function handleBackClick() {
        // Scroll to review element
        scrollToRef(reviewRef)
    }
    const [isVerified, setVerified] = useState([]);

    const user = fetchUserHandler(session ? session.user._id : null)
    console.log("hmm", user);
    
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
    //console.log(propertyDetails)
    //console.log(propertyImages)

    let streetName = streetAddress
    streetName = streetName.toUpperCase();
    const removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
    for (let term of removeTerms) {
        if (streetName.includes(term)) {
        streetName = streetName.substring(0, streetName.indexOf(term) - 1);
        }
    }
    //console.log('STREET NAME:', streetName)

    const fullLoc = `${streetName} ${zipcode}`;

    useEffect(() => {
        const options = geoOptions(fullLoc);
        fetchGeoSearch(options).then((response) => {
            const geoSearchProps = response.features[0]?.properties
            //console.log(fullLoc)
            //console.log(geoSearchProps)
            return geoSearchProps
        }).then((geoSearchProps) => {
            //console.log(geoSearchProps.pad_orig_stname, geoSearchProps.pad_low)
             if(geoSearchProps){
                let options = options = registeredOptions(geoSearchProps.pad_orig_stname, undefined, geoSearchProps.pad_low)
                fetchOpenApi(options).then((response) => {
                if(response.length === 0){
                    options = registeredOptions(geoSearchProps.pad_orig_stname, geoSearchProps.housenumber)
                    fetchOpenApi(options).then((response) => {
                        setVerified(response)
                    })
                }
                else{
                    setVerified(response)
                }
            })
            }
            else{
                setVerified([])
            }
        })
    }, []);
    
    // Call API to add this property to the current user's list of saved properties.
    const saveProperty = () => {
      if (!session) { //if there's no session, toast a message alerting them of this.
        return toast({
          title: "Not logged in",
          description:
            "You can't save a property because you're not logged in.",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 2000,
        });
      }
      const user = session.user;
      const propertyToSave = {
        zpid: propertyDetails.zpid,
        address: `${brokerageName}, ${streetAddress}, ${address.city}, ${address.state} ${zipcode}`,
        imgSrc: propertyDetails.imgSrc,
        price: propertyDetails.price,
        bedrooms: propertyDetails.bedrooms,
        bathrooms: propertyDetails.bathrooms,
        livingArea: propertyDetails.livingArea,
        isRental: (propertyDetails.homeStatus === "FOR_RENT") ? true : false,
      };
      saveHandler(propertyToSave, user);
    }

    return (
        <Box maxWidth='1000px' margin='auto' p='4'>
          {/* if the listing has images, we can generate an image scroller*/}
          {images && <ImageScrollbar data={images}/>}

          <Box w='full' p='6'>
            <Flex paddingTop='2' alignItems='center'>
              <Text fontWeight='bold' fontSize='3xl'>${price.toLocaleString("en-US")}{homeStatus === "FOR_RENT" ? '/mo' : ''}</Text>
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
              <HStack spacing='24px' paddingBottom='3'>
                <Button leftIcon={<MdFavoriteBorder />} colorScheme='blue' size='lg' variant='outline' onClick={() => saveProperty()}>
                  Save
                </Button>

                <Button leftIcon={<MdStarRate />} colorScheme='blue' size='lg' variant='outline' onClick={handleBackClick}>
                  Review
                </Button>

                <Button leftIcon={<MdLaunch />} colorScheme='blue' size='lg' variant='outline'>
                  Apply
                </Button>
              </HStack>
              <Text lineHeight='2' color='gray.600'>{description}</Text>
            </Box>


          
            <br/>
            {isVerified.length > 0 ? <Violations data={{buildingid: isVerified[0].buildingid, boro: isVerified[0].boroid, block: isVerified[0].block, lot: isVerified[0].lot}} registered='true' /> : <Violations></Violations>}

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


            <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between' borderBottom='1px' borderColor='gray.400'>
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

            <br />

            <div ref={reviewRef}>
            <Reviews></Reviews>
            </div>

          </Box>

        </Box>
    )
}

export async function getServerSideProps({ params: { zpid }, req }) {
    //generate the fetch object for the property details and images
  const myProperty = propertyDetailOptions(zpid);
  const myImages = propertyImageOptions(zpid);

  //make calls
  const data = await fetchZillowApi(myProperty)
  //prevent throttling errors
  await new Promise(resolve => setTimeout(resolve, 500));
  const images = await fetchZillowApi(myImages);

  const session = await getSession({ req });

  return {
    props: {
      propertyDetails: data,
      propertyImages: images,
      session: session,
      zpid: zpid
    },
  };
}

export default PropertyDetailsPage;