import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdReportProblem } from 'react-icons/md';
import {IoAlert} from 'react-icons/io5'
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'


const ComplaintsTotal = ({complaintsData, emergencyComplaints}) => {


    if(complaintsData.length === 0){
        return(
            <>
            <Box marginTop='5' w='40%' backgroundColor={'#C1A6D4'} color={'#5A2E7A'} border='1px' borderColor={'#5A2E7A'} borderRadius='lg' marginLeft='50'>
            <Box p='3.5' marginTop='1'>
                <Flex w='100%'>
                    <Box w='17%'>
                        <IoAlert size={45}/>
                    </Box>
                    <Center>
                        <Box>
                            <Text fontSize={'xl'} fontWeight='bold'>{`There are no 311 complaints in this building.`}</Text>
                            <Text fontSize={'sm'} paddingTop='2px' fontWeight='semibold' as='i'>{`Emergencies are any complaints that may make a unit uninhabitable.`}</Text>
                        </Box>
                    </Center> 
                </Flex>
            </Box>
        </Box>    
        </>
        )
    }

    return(
        <Box marginTop='5' w='40%' backgroundColor={'#C1A6D4'} color={'#5A2E7A'} border='1px' borderColor={'#5A2E7A'} borderRadius='lg' marginLeft='50'>
            <Box p='3.5' marginTop=''>
                <Flex w='100%'>
                    <Box w='17%'>
                        <IoAlert size={45}/>
                    </Box>
                    <Center>
                        <Box>
                            <Text>{`${complaintsData.length} total 311 complaints in this building.`}</Text>
                            <Text fontSize={'xl'} paddingTop='2px' fontWeight='bold'>{`${emergencyComplaints.length} of these are emergencies.`}</Text>
                            <Text fontSize={'sm'} paddingTop='2px' fontWeight='semibold' as='i'>{`Emergencies are any complaints that may make a unit uninhabitable.`}</Text>
                        </Box>
                    </Center>
                </Flex>
            </Box>
        </Box>      
    )

}

export default ComplaintsTotal;
