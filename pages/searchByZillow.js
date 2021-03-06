import {
    Box,
    FormControl, FormLabel, Input, Button,
    Flex, Text, Divider,
    useToast
} from '@chakra-ui/react';

import { InfoIcon } from '@chakra-ui/icons';

import { useState } from 'react';

import { propertyDetailOptions, fetchZillowApi } from "../utils/fetchZillowApi";
import Property from '../components/Property';

const SearchByZillowPage = () => {
    // Hooks
    const toast = useToast();
    const [resultPropertyData, setResultPropertyData] = useState();

    // Helper functions
    // This is the function that extracts the Zpid from the URL.
    // It is uncertain whether this works for all Zillow URLs at the moment.
    const extractZpid = (s) => {
        if (!s.includes('zpid'))
        {
            return '';
        }

        return s.substring(0,s.indexOf('zpid')-1);
    }

    // Return address usable by Property component
    // because Zillow API has inconsistent formatting
    const reconstructAddress = (property) => {
        return property.address.streetAddress + ", " + property.address.city + ", " + property.address.state + " " + property.address.zipcode;
    }

    const handleSubmit = async () => {
        console.log('Submitting URL');

        // Retrieve URL
        const enteredURL = document.getElementById("zURL").value.trim();
        const split = enteredURL.split('/');
        let extractedZpid = '';
        for (let i = 0; i < split.length; i++)
        {
            if(extractZpid(split[i]) != '')
            {
                extractedZpid = extractZpid(split[i]);
            }
        }

        // Invalid input
        if ((enteredURL === "") || extractedZpid === "")
        {
            toast({
                title: "Invalid Zillow URL",
                description: "Try again or enter a different Zillow listing URL",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2500,
              });
        }

        // Valid input
        const fetchedPropertyOptions = propertyDetailOptions(extractedZpid);
        const fetchedPropertyDetails = await fetchZillowApi(fetchedPropertyOptions);
        console.log(fetchedPropertyDetails)
        // Invalid result
        if (fetchedPropertyDetails.address === null)
        {
            toast({
                title: "Invalid Zillow URL",
                description: "Try again or enter a different Zillow listing URL",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2500,
              });
        }

        // Valid result
        else {
            const formattedData = {
                zpid: fetchedPropertyDetails.zpid,
                address: reconstructAddress(fetchedPropertyDetails),
                imgSrc: fetchedPropertyDetails.imgSrc,
                price: fetchedPropertyDetails.price,
                bedrooms: fetchedPropertyDetails.bedrooms,
                bathrooms: fetchedPropertyDetails.bathrooms,
                livingArea: fetchedPropertyDetails.livingArea,
                homeStatus: fetchedPropertyDetails.homeStatus
            };
            setResultPropertyData(formattedData);
            toast({
                title: "Success!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2500,
              });
        }
    }
    return (
        <Box>
            <Flex justifyContent='center' alignItems='center' >
                <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'>
                    Enter a Zillow Listing URL to View its Remy Page
                </Text>
            </Flex>
            <Flex margin='auto' maxW='600px' p='5'>
                <Text fontSize='1xl' color='gray.600'>
                    If you already have an existing Zillow listing and want to reach
                    Remy's page for it, enter the URL here.
                </Text>
            </Flex>
            <Flex maxW='600px' margin='auto' p='5'>
                <InfoIcon pr='1'  w={6} h={6} color='blue.500'/>
                <Text color='gray.600'>Note: Ensure that you only enter <b>New York City</b> listings.
                Ensure you are on a single Zillow listing with an address. This does not work for group
                or template listings for "types" of apartments.</Text>
            </Flex>

            <Flex justifyContent='center' alignItems='center' p='8' margin='auto'>
                <Box borderRadius='md' w='700px'>
                <FormControl>
                    <FormLabel htmlFor='url'>Zillow URL</FormLabel>
                    <Input id='zURL' placeholder='Enter Zillow URL'></Input>
                    <Box display='flex' flexDir='column' pt='1' alignItems='flex-end'>
                        <Button colorScheme='blue' w='100px' onClick={() => handleSubmit()}>Submit</Button>
                    </Box>
                </FormControl>
                </Box>
            </Flex>
            {
                resultPropertyData ?
                <Box>
                    <Divider></Divider>
                    <Flex justifyContent='center' alignItems='center' >
                        <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'>
                            Result
                        </Text>
                    </Flex>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Property
                            property={resultPropertyData}
                            key={resultPropertyData.zpid}
                            isRental={resultPropertyData.homeStatus === 'FOR_RENT' ? true : false}
                        />
                    </Box>
                </Box>
                :
                <></>
            }
        </Box>
    );
}

export default SearchByZillowPage;