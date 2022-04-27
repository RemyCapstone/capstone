import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, Stack, HStack, VStack, Divider, Center, useToast, Link } from '@chakra-ui/react'
import { FaStar, FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdFavoriteBorder, MdStarRate, MdLaunch, MdFavorite } from 'react-icons/md';
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
import ReportForm from '../../components/ReportForm';

import { server } from '../../config/index'; // dyanmic absolute routes

/* Handle saving/unsaving a property for a user */
const saveHandler = async(property, user) => {
  const response = await fetch('/api/saveProperty', {
    method: 'POST',
    body: JSON.stringify([property, user]),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const res = await response;
  const data = await res.json();
  return [data.message, data.type, res.status];
}

/* Handle getting a single user's data */
const fetchUserHandler = async (id) => {
  const response = await fetch(`${server}/api/user`, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  // console.log("FETCHUSERHANDLER", data);
  return data.user;
};


/* Handle creating a new review */
const postReviewHandler = async (review) => {
  const response = await fetch(`${server}/api/submitReview`, {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // console.log('POSTREVIEWHANDLER', response)
  return {data, status: response.status}
}

/* Handle getting all reviews for this property */
const fetchReviewsHandler = async (property) =>  {
  const response = await fetch(`${server}/api/fetchPropertyReviews`, {
    method: "POST",
    body: JSON.stringify(property),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.reviews;
}
/* Handle getting the status of a single property for a user */
const fetchPropertyStatusHandler = async (zpid, userid) => {
  const response = await fetch(`${server}/api/user/getPropertyStatus`, {
    method: 'POST',
    body: JSON.stringify([zpid, userid]),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const res = await response;
  const data = await res.json();
  return data.savedStatus;
}


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop+500)

const PropertyDetailsPage = ({propertyDetails, propertyImages, session, zpid, savedStatus, propertyReviews}) => {
    const toast = useToast();
    const reviewRef = useRef(null);
    const router = useRouter();
    const [isVerified, setVerified] = useState([]);
    const [isSaved, setIsSaved] = useState(savedStatus);
    
    
    console.log('reviews for this property:', propertyReviews)

    const [displayTotal, setDisplayTotal] = useState(propertyReviews.length);
    let total = 0
    for(let i = 0; i < propertyReviews.length; i++) {
      total += propertyReviews[i].stars
    }
    const rating = total / propertyReviews.length
    const [displayRating, setDisplayRating] = useState(rating || 0);
    const userReview = session ? propertyReviews.find( (review) => review.userid === session.user._id ) : undefined;
    // console.log('This user\'s review:',userReview)
    /*
      Sort all reviews based on timestamp.
      If in the unlikely event someone makes a review at the exact same time, we sort by their first name. If they ALSO have the same first name, it's doomed.

      Then filter the user review from all reviews to display separately.
    */
    const sortedPropertyReviews = propertyReviews.sort((a, b) => {
      (a.createdAt > b.createdAt) ? 1 : ((a.createdAt.getTime() === b.createdAt.getTime())  ? ((a.user.firstName > a.user.firstName) ? 1 : -1) : -1)
    }).filter((e) => e !== userReview)

    // console.log('all reviews for this property:', sortedPropertyReviews)
    function handleBackClick() {
        // Scroll to review element
        scrollToRef(reviewRef);
    }

    // Break down property details fetched data into these parts
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

    let streetName = streetAddress
    streetName = streetName.toUpperCase();
    const removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
    for (let term of removeTerms) {
        if (streetName.includes(term)) {
        streetName = streetName.substring(0, streetName.indexOf(term) - 1);
        }
    }
    const fullLoc = `${streetName} ${zipcode}`;

    useEffect(() => {
        const options = geoOptions(fullLoc);
        fetchGeoSearch(options).then((response) => {
            const geoSearchProps = response.features[0]?.properties;
            return geoSearchProps;
        }).then((geoSearchProps) => {
             if(geoSearchProps){
                let options = options = registeredOptions(geoSearchProps.pad_orig_stname, undefined, geoSearchProps.pad_low)
                fetchOpenApi(options).then((response) => {
                if(response.length === 0){
                    options = registeredOptions(geoSearchProps.pad_orig_stname, geoSearchProps.housenumber)
                    fetchOpenApi(options).then((response) => {
                        setVerified(response);
                    })
                }
                else {
                    setVerified(response);
                }
            })
            }
            else {
                setVerified([]);
            }
        })
    }, []);

    // Call API to add this property to the current user's list of saved properties.
    const saveProperty = async () => {
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
      // Save a "snapshot" of the property due to API throttling.
      const propertyToSave = {
        zpid: propertyDetails.zpid,
        address: `${brokerageName ? brokerageName : ''}, ${streetAddress}, ${address.city}, ${address.state} ${zipcode}`,
        imgSrc: propertyDetails.imgSrc,
        price: propertyDetails.price,
        bedrooms: propertyDetails.bedrooms,
        bathrooms: propertyDetails.bathrooms,
        livingArea: propertyDetails.livingArea,
        isRental: (propertyDetails.homeStatus === "FOR_RENT") ? true : false,
      };
      const res = await saveHandler(propertyToSave, user);
      // React to result of the save
        toast({
          title: res[0],
          status: res[1],
          isClosable: true,
          position: "top",
          duration: 2000,
        });

        if (res[2] == 200) {
          setIsSaved(!isSaved);
        }
      }

    // Make Zillow URL - not fully tested
    const makeZillowUrl = (zpid) => {
      return "https://www.zillow.com/homes/" + zpid + "_zpid/";
    }

    return (

        <Box maxWidth='1300px' margin='auto' p='4'>

          {/*.............. Gallery and general info ..............*/}
          <Flex w='full' marginTop='2%'>
            <Box w='60%'>
              {images && <ImageScrollbar data={images}/>}
            </Box>
            <Spacer />
            <Box w='35%' marginTop='1%'>
              <Text fontSize='2xl' marginBottom='1' fontWeight='semibold'>
                {brokerageName} {streetAddress}
              </Text>
              <Text fontSize='xl'>
                {address.city}, {address.state} {zipcode}
              </Text>
              {/* Divide price and average rating here */}
              <Flex>
                  <Box w='70%' textAlign='left'>
                    <Text fontWeight='bold' fontSize='2xl'>${price.toLocaleString("en-US")}{homeStatus === "FOR_RENT" ? '/mo' : ''}</Text>
                  </Box>
                  {/* Dummy rating here */}
                  <Box w='40%' textAlign='right'>
                    <Flex>
                      <Center>
                        <FaStar size={20} color='#FFC107'/>
                        <Text fontSize='xl' paddingLeft='5px' >{displayRating ? displayRating.toFixed(1) : ''}&nbsp;  </Text>
                        <Text fontSize='xl' color='gray.400'>{`(${displayTotal} ratings)`}</Text>
                      </Center>
                    </Flex>
                  </Box>
              </Flex>
              <br/>
              <HStack spacing='20px' paddingBottom='3'>
                {
                  isSaved ?
                  // Unsave if saved
                  <Button leftIcon={<MdFavorite />} colorScheme='blue' size='md' variant='outline' onClick={() => saveProperty()}>
                    Unsave
                  </Button>
                  :
                  // Save if unsaved
                  <Button leftIcon={<MdFavoriteBorder />} colorScheme='blue' size='md' variant='outline' onClick={() => saveProperty()}>
                    Save
                  </Button>
                }
                <Button leftIcon={<MdStarRate />} colorScheme='blue' size='md' variant='outline' onClick={handleBackClick}>
                  Review
                </Button>
                <Link href={makeZillowUrl(zpid)} isExternal>
                  <Button leftIcon={<MdLaunch />} colorScheme='blue' size='md' variant='outline'>
                    Apply
                  </Button>
                </Link>
              </HStack>
              <Divider />
              <Flex w='80%' p='3'>
                <Box>
                  <Flex><FaBed size={20}/><Text marginLeft='10px'>{bedrooms} {bedWord}</Text></Flex>
                </Box>
                <Box w='10%'>
                  <Center><Text color='#C4C4C4'>•</Text></Center>
                </Box>
                <Box>
                  <Flex><FaBath size={20} /><Text marginLeft='10px'>{bathrooms} {bathWord}</Text></Flex>
                </Box>
                <Box w='10%'>
                  <Center><Text color='#C4C4C4'>•</Text></Center>
                </Box>
                <Box>
                  <Flex><BsGridFill size={20}/><Text marginLeft='10px'>{livingArea ? millify(livingArea) : '?' } sqft</Text></Flex>
                </Box>
              </Flex>
              <Divider />
              <Flex>
                <Box w='50%' textAlign='left'>
                  {homeType && <>
                    <Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Type</Text>
                  <Text fontSize='lg'>{homeType}</Text>
                  </>}

                  {listingProvider?.agentName && <>
                      <Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Listed by</Text>
                  <Text fontSize='lg'>{listingProvider.agentName}</Text>
                  </>}
                  {yearBuilt && <><Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Year Built</Text>
                  <Text fontSize='lg'>{yearBuilt}</Text>  </>}
                </Box>
                <Box w='50%' textAlign='left'>
                  <Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Purpose</Text>
                  <Text fontSize='lg'>{homeStatus === "FOR_RENT" ? "FOR RENT" : "FOR SALE"}</Text>
                  {timeOnZillow && <>
                  <Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Listed for</Text>
                  <Text fontSize='lg'>{timeOnZillow}</Text>
                  </>}
                  {brokerageName &&
                      <>
                      <Text fontSize='lg' textTransform='uppercase' fontWeight='semibold' marginTop='5%'>Brokerage Name</Text>
                      <Text fontSize='lg'>{brokerageName}</Text>
                      </>
                  }
                </Box>
              </Flex>
              <Flex w='full'>
                <Box>
                  {/* Placeholder to move the report button */}
                </Box>
                <Spacer/>
                  <Box alignItems='right'>
                    {/* User can report a violation outside of HPD/311 directly to us mods */}
                    <ReportForm
                      zpid={zpid}
                      address={address}
                      purpose={propertyDetails.homeStatus === "FOR_RENT" ? "Rental" : "Home"}
                    />
                  </Box>
              </Flex>
            </Box>
          </Flex>
          <br/>
          <Box maxWidth='1000px' margin='auto' p='4'>
          <Flex w='full'>
            <Text fontWeight='bold' fontSize='xl'>Description</Text>
          </Flex>
          <Flex w='full'>
            <Text lineHeight='2' color='gray.600'>{description}</Text>
          </Flex>
          <br/>
          <Flex>
              <Box w='45%'>
                <Map location={location}></Map>
                <WalkScore long={longitude} lat={latitude} address={streetAddress}/>
              </Box>
              <Spacer/>
              <Box w='50%' paddingLeft={10}>
                {/* insert price history chart here*/}
                <PriceHistoryTable data={priceHistory}/>
              </Box>
          </Flex>

          <br/><br/>

          {/*.............. Violations and Complaints ..............*/}
          {isVerified.length > 0 ? <Violations data={{buildingid: isVerified[0].buildingid, boro: isVerified[0].boroid, block: isVerified[0].block, lot: isVerified[0].lot}} registered='true' /> : <Violations></Violations>}

        <br/>
          <Box w='full' p='5'>
            <br />
            <div ref={reviewRef}>
              <Reviews zpid={zpid} postReviewHandler={postReviewHandler} userReview={userReview} propertyReviews={sortedPropertyReviews} setDisplayRating={setDisplayRating} rating={rating} setDisplayTotal={setDisplayTotal} total={propertyReviews.length}> </Reviews>
            </div>
          </Box>
        </Box>
      </Box>
    )
}

export async function getServerSideProps({ params: { zpid }, req }) {
  // Generate the fetch object for the property details and images
  const myProperty = propertyDetailOptions(zpid);
  const myImages = propertyImageOptions(zpid);

  // Make calls
  const data = await fetchZillowApi(myProperty)
  // Prevent throttling errors
  await new Promise(resolve => setTimeout(resolve, 500));
  const images = await fetchZillowApi(myImages);

  // Get session user info
  const session = await getSession({ req });

  let propertySavedStatus = false;
  // let userReview = {};
  const propertyReviews = await fetchReviewsHandler(zpid);
  // let user = {};
  if (session) {
    propertySavedStatus = await fetchPropertyStatusHandler(zpid, session.user.email);
    // user = await fetchUserHandler(session.user._id);
  }

  return {
    props: {
      propertyDetails: data,
      propertyImages: images,
      session: session,
      zpid: zpid,
      savedStatus: propertySavedStatus,
      // user: user,
      propertyReviews: propertyReviews,
    },
  };
}

export default PropertyDetailsPage;