import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text} from "@chakra-ui/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';

import DefaultImage from '../assets/images/home.png';

/**
 * @returns a reusable component that is used to display a specific property listing "card"
 */
const Property = ({property , isRental}) => {
    //the specific zillow property gets passed in props so we destructure the individual listing
    //this contains things such as the image, price, id of the apartment (known as zpid or zillow property id)
    const { zpid, address, imgSrc, price, bedrooms, bathrooms, livingArea } = property;
    //console.log(zpid, address, imgSrc)


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


