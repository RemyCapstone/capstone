import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const router = useRouter();
    let path = router.pathname;
    let { query } = router;

    const searchProperties = (filterValues) => {

        const values = getFilterValues(filterValues)

        values.forEach((item) => {
        if(item.value && filterValues?.[item.name]) {
            query[item.name] = item.value
        }
        })
    };

    const handleClick = () => {
        router.push({ pathname: path, query: query });
    }

    return(
        <>
         <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters?.map((filter) => (
                <Box key={filter.queryName}>
                    <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2'>
                        {filter?.items?.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.name}
                        </option>
                        ))}
                    </Select>
                </Box>
            ))}
            <Button onClick={handleClick} leftIcon={<BsSearch />} colorScheme='teal' variant='solid'>
                Search
            </Button>
         </Flex>
         
        </>
    )
}

export default SearchFilters;