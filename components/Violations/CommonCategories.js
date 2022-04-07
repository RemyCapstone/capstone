import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdReportProblem } from 'react-icons/md';
import {AiFillBug} from 'react-icons/ai';
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'


const CommonCategories = ({sortableCategories}) => {
    
    if(sortableCategories.length === 0){
        return(
            <></>
        )
    }

    return(
        <>
            <Box marginTop='5' w='full' backgroundColor={'#63140b'} color={'#f2d6d3'} border='1px' borderColor={'black'} borderRadius='lg'>
                    <Box p='3.5'>
                        <Flex w='100%'>
                            <Box w='17%'>
                                <AiFillBug size={45}/>
                            </Box>
                            <Text fontSize={'2xl'} paddingTop='2px' fontWeight='bold'>{`This unit contains pests!`}</Text>
                        </Flex>
                        
                        <Box>
                            
                        </Box>
                    </Box>
            </Box>
        </>
    )

}

export default Pests;

