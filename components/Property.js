import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Spacer, Text} from "@chakra-ui/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import { GoVerified } from 'react-icons/go';
import {useState, useEffect} from 'react';

import DefaultImage from '../assets/images/home.png';
import {geoOptions, fetchGeoSearch} from '../utils/geoSearch'
import { registeredOptions, fetchOpenApi } from "../utils/hpdViolations";

/**
 * @returns a reusable component that is used to display a specific property listing "card"
 */
const Property = ({property , isRental,}) => {
    //the specific zillow property gets passed in props so we destructure the individual listing
    //this contains things such as the image, price, id of the apartment (known as zpid or zillow property id)
    const { zpid, address, imgSrc, price, bedrooms, bathrooms, livingArea } = property;
    //console.log(zpid, address, imgSrc)

    const [isVerified, setVerified] = useState('Not Registered');


    let addressSplit = address.split(',');
    
    if(addressSplit.length < 4){
        addressSplit = [''].concat(addressSplit);
    }

    //dealing with plurality depending on # of beds and baths
    let bedWord = 'Beds';

    if(bedrooms == 1){
        bedWord = 'Bed';
    }

    let bathWord = 'Baths';

    if(bathrooms == 1) {
        bathWord = 'Bath'
    }

    //console.log(addressSplit)

    const [residentalName, streetName, city, stateAndZip] = addressSplit;
    //console.log('STREET NAME:', streetName)

    useEffect(() => {
        const options = geoOptions(streetName);
        fetchGeoSearch(options).then((response) => {
            const geoSearchProps = response.features[0].properties
            return geoSearchProps
        }).then((geoSearchProps) => {
            const options = registeredOptions(geoSearchProps.pad_orig_stname, geoSearchProps.pad_low, geoSearchProps.pad_high)
            fetchOpenApi(options).then((response) => {
                setVerified(response)
            })
        })
    }, []);

    console.log(isVerified)
    

    return (
        //after clicking on a property we route to the specific property page
        //for new tab <a target="_blank" rel="noreferrer"></a>
        <Link href={`/property/${zpid}`} passHref>
            
            <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer' >
                <Box>
                    <Image src={imgSrc ? imgSrc : DefaultImage} alt="home" width={400} height={260}/>
                </Box>
                <Box w="full">
                    <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
                        <Flex alignItems='center'>
                            <Text fontWeight='bold' fontSize='lg'>${price}{isRental ? '/mo' : ''}</Text>
                            
                        </Flex>
                        <Flex>
                            <Text fontWeight='bold' fontSize='lg' color={isVerified.length > 0 ? 'teal.400' : 'red.400'}>{isVerified.length > 0 ? 'HPD Verified' : 'Not HPD Verified'}</Text>
                            <Box paddingLeft='3' paddingTop='1' color='green.500'>{isVerified.length >0 && <GoVerified />}</Box>
                        </Flex>
                    </Flex>
                    <Flex alignItems='center' p='1' justifyContent='space-between' w='260px' color='blue.400'> 
                        <FaBed /> {bedrooms} {bedWord} | <FaBath /> {bathrooms} {bathWord} | <BsGridFill /> {millify(livingArea)} sqft 
                    </Flex>
                    <Text fontSize='md' color='gray.700'>
                        {residentalName} {streetName} 
                        <br/>
                        {city}, {stateAndZip}
                        
                    </Text>
                </Box>
            </Flex>
        </Link>
    )
}

export default Property;


