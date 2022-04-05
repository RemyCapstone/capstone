import Link from "next/link";
import Image from "next/image";
import { Box, Button, IconButton, Flex, Spacer, Text, Tooltip, Center } from "@chakra-ui/react";
import { FaBed, FaBath, FaStar } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdFavoriteBorder, MdInfoOutline} from 'react-icons/md';
import millify from 'millify';
import { GoVerified, GoQuestion } from 'react-icons/go';
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

    const [isVerified, setVerified] = useState([]);


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

    let [residentalName, streetName, city, stateAndZip] = addressSplit;
    streetName = streetName.toUpperCase();
    const removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
    for (let term of removeTerms) {
        if (streetName.includes(term)) {
        streetName = streetName.substring(0, streetName.indexOf(term) - 1);
        }
    }
    //console.log('STREET NAME:', streetName)

    const fullLoc = `${streetName} ${stateAndZip.trim().substring(3)}`;

    useEffect(() => {
        const options = geoOptions(fullLoc);
        fetchGeoSearch(options).then((response) => {
            const geoSearchProps = response.features[0]?.properties
            //console.log(fullLoc)
            //console.log(geoSearchProps)
            return geoSearchProps
        }).then((geoSearchProps) => {
            //console.log(geoSearchProps)
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

    //console.log(isVerified)


    return (
        //after clicking on a property we route to the specific property page
        //for new tab <a target="_blank" rel="noreferrer"></a>
        <Link href={`/property/${zpid}/`} passHref>

            {/* NOTE: Brute forced the styling for the card margins to give spacing between each property, will probably need to adjust this in index.js and search.js */}
            <Flex flexWrap='wrap' w='400px' paddingTop='0px' justifyContent='flex-start' cursor='pointer' borderWidth='1px' borderRadius='2xl' marginRight='26px' marginBottom='25px'>
                <Box backgroundImage={imgSrc ? imgSrc : DefaultImage} backgroundPosition="center" width={400} height={200} borderTopLeftRadius='2xl' borderTopRightRadius='2xl'>
                    <Flex>
                        {/* TO-DO: Display ratings on property cards if available */}
                        {/* 
                        <Box backgroundColor='white' borderRadius='2xl' width={70} p='2' marginLeft='3' marginTop='3'>
                            <Flex>
                                <FaStar size={20} color='#FFC107'/>
                                <Text marginLeft={2}>3.5</Text>
                            </Flex>
                        </Box>
                        */}
                        
                        {/* TO-DO: Add Save functionality to pages with multiple property cards */}
                        {/* Save button on top right of property card */}
                        {/*
                        <Box marginLeft='255' marginTop='3'> 
                            <IconButton
                                variant='outline'
                                backgroundColor='white'
                                borderColor='white'
                                color='#B0B0B0'
                                aria-label='Save property'
                                borderRadius='50%'
                                icon={<MdFavoriteBorder size={25}/>}  
                            />    
                        </Box>
                        */}
                    </Flex>
                    
                    
                     
                </Box>
                <Box w="full" paddingLeft='5' paddingRight='5' paddingBottom='5'>
                    <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
                        <Flex alignItems='center'>
                            <Text fontWeight='bold' fontSize='lg'>${price.toLocaleString("en-US")}{isRental ? '/mo' : ''}</Text>

                        </Flex>
                        <Flex>
                            <Text fontWeight='semibold' fontSize='sm' paddingLeft='2' paddingRight='2' paddingTop='1' paddingBottom='1' borderRadius='lg' textTransform='uppercase' backgroundColor={isVerified.length > 0 ? '#329785' : '#CB4C4C'} color={'white'}>{isVerified.length > 0 ? 'HPD Verified' : 'Not Verified'}</Text>
                            {/*<Box paddingLeft='2' paddingTop='0' _hover={{ color: "teal.600"}} color= {isVerified.length >0 ? 'green.500' : 'gray.500'}>{isVerified.length >0 ? <GoVerified /> : <Link href='/notregistered' passHref><Text fontSize='xs'>Learn More</Text></Link> }</Box>*/}
                            <Box paddingTop='0' _hover={{ color: "teal.600"}} color= {isVerified.length >0 ? 'green.500' : 'gray.500'}>{isVerified.length >0 ? <Text></Text> : <Text marginLeft='2'><Link href='/notregistered' passHref><MdInfoOutline/></Link></Text> }</Box>
                        </Flex>
                    </Flex>
                    <Flex alignItems='center' p='1' justifyContent='space-between' w='300px' color='#6F7583'>
                        <Box>
                            <Flex><FaBed size={20}/><Text marginLeft='10px'>{bedrooms} {bedWord}</Text></Flex>
                        </Box>
                        <Box>
                            <Text>•</Text>
                        </Box>        
                        <Box>
                            <Flex><FaBath size={20}/><Text marginLeft='10px'>{bathrooms} {bathWord}</Text></Flex>
                        </Box>
                        <Box>
                            <Text>•</Text>
                        </Box>   
                        <Box>
                            <Flex><BsGridFill size={20}/><Text marginLeft='10px'>{millify(livingArea)} sqft</Text></Flex>
                        </Box>
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


