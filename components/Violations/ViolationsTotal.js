import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdSchedule } from 'react-icons/md';


const ViolationsTotal = ({data}) => {

    return(
        <Box w='full' backgroundColor='#DCEAF6' color='#4C78AD' border='1px' borderColor='#5B86B9' borderRadius='lg'>
            <Flex p='3'>
                <Box w='17%'>
                    <Center>
                        <MdSchedule size={45}/>
                    </Center>
                </Box>    
                <Center>
                    <Box>
                        <Text fontWeight='semibold'>{`This building has ${data.length} total violations.`}</Text>
                    </Box>
                </Center>
            </Flex>
        </Box>
    )

}

export default ViolationsTotal;