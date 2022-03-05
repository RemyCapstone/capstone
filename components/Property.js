import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text} from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

/**
 * @returns a reusable component that is used to display a specific property listing "card"
 */
const Property = ({property}) => {
    //the specific zillow property gets passed in props so we destructure the individual listing
    //this contains things such as the image, price, id of the apartment (known as zpid or zillow property id)
    const { zpid, address, imgSrc, bedrooms, bathrooms } = property;
    //console.log(zpid, address, imgSrc)


    return (
        //after clicking on a property we route to the specific property page
        <Link href={`/property/${zpid}`} passHref>{address}</Link>
    )
}

export default Property;


