import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { useRouter } from 'next/router';

const PropertyDetailsPage = () => {
    const router = useRouter();


    return (
        <Box>
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Zillow Property id: {router.query.zpid}
            </Text>
            <Text fontSize='2xl' p='4' fontWeight='bold' color='red.600'>
                Coming Soon...
            </Text>
        </Box>
    )
}

export default PropertyDetailsPage;