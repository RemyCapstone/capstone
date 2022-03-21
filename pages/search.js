import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilter';
import noresult from '../assets/images/noresults.png'
import { fetchZillowApi } from "../utils/fetchZillowApi";
import {geoOptions, fetchGeoSearch} from '../utils/geoSearch'
import { registeredOptions, fetchOpenApi } from "../utils/hpdViolations";

const SearchPage = ({properties}) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();

    //console.log(properties)

    let usableProperties = properties.filter(property => !property.zpid.includes(".") && !property.address.includes('(undisclosed Address)'))

    let promiseArray = [];
    for(const prop of usableProperties){

    }

    let limit = usableProperties.length <= 12*(currentPage+1) ? usableProperties.length : 12*(currentPage+1);
    const iterations = Math.ceil(usableProperties.length / 12);
    const pages = []

    for(let i=1; i<=iterations; i++){
      pages.push(i)
    }

    //console.log('amount: ', usableProperties, 'iterations: ', iterations)
    //console.log(pages)
    //console.log(usableProperties)

    //console.log('starting index: ', 12*currentPage, 'limit:', limit)

    const clickHandler = (page) => {
      setCurrentPage(page);
    }

    return (
        <Box>
            <Flex  onClick={() => setSearchFilters(!searchFilters)} cursor='pointer' bg='gray.100' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='black' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>Filter Searches</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
             <Flex flexWrap='wrap'>
                {/*usableProperties.map((property) => <Property property={property} key={property.zpid} isRental={router.query.purpose === 'for-rent'? true : false}/>)*/}
                {
                  usableProperties.slice(12*currentPage, limit).map((property) => <Property property={property} key={property.zpid} isRental={router.query.purpose === 'for-rent'? true : false}/>)
                }
                {iterations > 1 && <Flex w='100%' justifyContent='center' alignItems='center' cursor='pointer'>
                  {pages.map((page, index) => <Text onClick={() => clickHandler(index)} fontSize='2xl' p='4' fontWeight='bold' key={page} color={index === currentPage ? 'blue.700' : 'blue.300'} textAlign='center'>{page}</Text>)}
                </Flex>}

            </Flex>
            {usableProperties.length === 0 && (
              <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
                <Image src={noresult} />
                <Text fontSize='2xl' marginTop='3'>No Result Found.</Text>
              </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({ query }) {
  const baseOptions = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
    params: {
      location: 'Queens, New York, NY',
      status_type: query.purpose === 'for-rent' ? 'ForRent' : 'ForSale',
      home_type: 'Apartments',
      rentMinPrice: query.minPrice || '100',
      rentMaxPrice: query.maxPrice || '5000',
      bathsMin: query.bathsMin || '1',
      bathsMax: '10',
      bedsMin: query.roomsMin || '1',
      bedsMax: '10',
      sort: query.sortBy || '',
      sqftMin: query.areaMin || '1',
      sqftMax: query.areaMax || '10000'
    },
    headers: {
      'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
      'x-rapidapi-key': '7b95d439b1msh053237cc2d2fd67p1aefc7jsn0779bacb22ad'
    }
  };

  const fetchedProperties = await fetchZillowApi(baseOptions)

  return {
    props: {
      properties: fetchedProperties?.props,
    },
  };
}

export default SearchPage;