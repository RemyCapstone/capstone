import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdReportProblem } from 'react-icons/md';
import {FaChartPie} from 'react-icons/fa';
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'


const CommonCategories = ({sortableCategories, total}) => {
    
    //console.log(sortableCategories)

    if(sortableCategories.length === 0){
        return(
            <></>
        )
    }

    return(
        <>
            <Box marginTop='5' w='full' backgroundColor={'rgb(255,185,0)'} color={'rgb(255, 245, 230)'} border='1px' borderColor={'black'} borderRadius='lg'>
                    <Box p='3.5'>
                        <Flex w='100%'>
                            <Box w='17%'>
                                <FaChartPie size={45}/>
                            </Box>
                            <Text fontSize={'3xl'} paddingTop='2px' fontWeight='bold'>{`Most common category of complaints:`}</Text>
                        </Flex>
                        
                        <Box>
                            {sortableCategories.map(e => <Tag size={'lg'} marginTop={3} marginRight={3} variant='subtle' colorScheme='orange' border='1px'>
                                <TagLeftIcon boxSize='12px' as={MdReportProblem} />
                                <TagLabel>{`${e[0]} (${(e[1]/total*100).toFixed(1)}%)`}</TagLabel>
                            </Tag>)}
                        </Box>
                    </Box>
            </Box>
        </>
    )

}

export default CommonCategories;

