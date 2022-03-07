import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilter';
import noresult from '../assets/images/noresults.png'

const SearchPage = ({properties}) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex  onClick={() => setSearchFilters(!searchFilters)} cursor='pointer' bg='gray.100' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='black' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>Search By Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
             <Flex flexWrap='wrap'>
                {/*properties.map((property) => <Property property={property} key={property.zpid} />) */}
            </Flex>
            {properties.length === 0 && (
            <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <Image src={noresult} />
            <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
            </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      properties: [],
    },
  };
}

export default SearchPage;