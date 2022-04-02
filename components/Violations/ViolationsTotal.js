import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
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
                    <Box width='290px' paddingLeft={3}>
                        <Text fontWeight='semibold'>{`This building has ${data.length} total violations.`}</Text>
                    </Box>
                    <Flex>
                        <Tooltip label={'This includes the history of every violation submitted for this building, both closed and open.'} placement='right-end' bg='gray.50' color='black'>
                            <span style={{fontWeight: 'bold', border: '2px solid #666', color: 'white', backgroundColor: '#38393b', paddingRight: '.5em', paddingLeft: '.5em', borderRadius: '50%'}}>{'?'}</span>
                        </Tooltip>
                    </Flex>
                </Center>
            </Flex>
        </Box>
    )

}

export default ViolationsTotal;