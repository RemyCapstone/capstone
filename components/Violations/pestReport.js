import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdReportProblem } from 'react-icons/md';
import {AiFillBug} from 'react-icons/ai';
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'


const Pests = ({pestTag, bedBugs, mice, roach}) => {
    
    if(pestTag.length === 0){
        return(
            <>
            <Box marginTop='5' w='40%' backgroundColor={'#defff7'} color={'#2cc7a1'} border='1px' borderColor={'#2cc7a1'} borderRadius='lg'>
                    <Box p='3.5'>
                        <Flex w='100%'>
                            <Box w='17%'>
                                <AiFillBug size={45}/>
                            </Box>
                            <Text fontSize={'2xl'} paddingTop='2px' fontWeight='bold'>{`No pest sightings found!`}</Text>
                        </Flex>
                    </Box>
            </Box>
        </>
        )
    }

    return(
        <>
            <Box marginTop='5' w='40%' backgroundColor={'#63140b'} color={'#f2d6d3'} border='1px' borderColor={'black'} borderRadius='lg'>
                    <Box p='3.5'>
                        <Flex w='100%'>
                            <Box w='17%'>
                                <AiFillBug size={45}/>
                            </Box>
                            <Text fontSize={'2xl'} paddingTop='2px' fontWeight='bold'>{`This unit contains pests!`}</Text>
                        </Flex>
                        
                        <Center>
                            {bedBugs.length > 0 && <Flex><Tag size={'lg'} marginTop={3} marginRight={3} variant='subtle' colorScheme='red' border='1px'>
                                <TagLeftIcon boxSize='12px' as={MdReportProblem} />
                                <TagLabel>BEDBUGS</TagLabel>
                            </Tag></Flex>}
                            {mice.length > 0 && <Flex><Tag size={'lg'} marginTop={3} marginRight={3} variant='subtle' colorScheme='red' border='1px'>
                                <TagLeftIcon boxSize='12px' as={MdReportProblem} />
                                <TagLabel>MICE</TagLabel>
                            </Tag></Flex>}
                            {roach.length > 0 && <Flex><Tag size={'lg'} marginTop={3} marginRight={3} variant='subtle' colorScheme='red' border='1px'>
                                <TagLeftIcon boxSize='12px' as={MdReportProblem} />
                                <TagLabel>ROACHES</TagLabel>
                            </Tag></Flex>}
                        </Center>
                    </Box>
            </Box>
        </>
    )

}

export default Pests;

