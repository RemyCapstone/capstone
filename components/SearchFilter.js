import { useEffect, useState, useRef } from 'react';
import SelectSearch from "react-select-search";
import { Flex, Select, Box, Text, Input, Spinner, Spacer, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { filterData, getFilterValues } from '../utils/filterData';
import { locations } from '../utils/locationData';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const router = useRouter();
    let path = router.pathname;
    let { query } = router;
    const searchInput = useRef();

    const searchProperties = (filterValues, locationValue) => {

        const values = getFilterValues(filterValues)
       //console.log("values", values)
        values.forEach((item) => {
        if(item.value && filterValues?.[item.name]) {
            query[item.name] = item.value
        }
        })

        //console.log(query)
    };

    const handleClick = () => {
        router.push({ pathname: path, query: query });
    }
        

    const handleFilter = (items) => {
    return (searchValue) => {
        if (searchValue.length === 0) {
            return locations;
        }
        const updatedItems = items.map((list) => {
            const newItems = list.items.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
            });
            return { ...list, items: newItems };
        });
        return updatedItems;
        };
    };

    const handleChange = (...args) => {
        // searchInput.current.querySelector("input").value = "";
        //console.log("ARGS:", args[0]);
        //console.log('change to brooklyn, ny')
        searchProperties({ ['location']: args[0] }, args[0])
        //console.log(query)
        
    };

    return(
        <>
         <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
             
            {filters?.map((filter) => {
                //console.log(filter)
                if(filter.queryName !== 'location'){
                return (<Box key={filter.queryName}>
                    <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2'>
                        {filter?.items?.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.name}
                        </option>
                        ))}
                    </Select>
                </Box>)
                }
            })}
            <Flex paddingRight={5}>
            <SelectSearch
                ref={searchInput}
                options={locations}
                filterOptions={handleFilter}
                value=""
                name="Location"
                placeholder="Choose Location"
                search
                onChange={handleChange}
            />
            </Flex>
            <Button onClick={handleClick} leftIcon={<BsSearch />} colorScheme='teal' variant='solid'>
                Search
            </Button>
         </Flex>

        </>
    )
}

export default SearchFilters;