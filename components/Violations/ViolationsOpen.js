import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { MdReportProblem } from 'react-icons/md';


const ViolationsOpen = ({data, avgViolations}) => {

    let bgColor = '';
    let brdrColor = '';
    let textColor = '';

    if(avgViolations == 0){
        bgColor = '#D5F3E5';
        brdrColor = '#34B476';
        textColor = '#179859';
    } else if (avgViolations < 1) {
        bgColor = '#F5E7C0';
        brdrColor = '#EDAB00';
        textColor = '#C28C01';
    } else {
        bgColor = '#F9DFE2';
        brdrColor = '#C9081F';
        textColor = '#C3091F';
    }

    return(
        <Box w='full' backgroundColor={bgColor} color={textColor} border='1px' borderColor={brdrColor} borderRadius='lg'>
            <Flex p='3.5'>
                <Box w='17%'>
                    <Center>
                        <MdReportProblem size={45}/>
                    </Center>
                </Box>
                <Center>
                    <Box>
                        <Text fontWeight='semibold'>{`This listing has ${data.length} open violations.`}</Text>
                        <Text>{`Average: ${avgViolations} violations per unit`}</Text>
                    </Box>
                </Center>
            </Flex>
        </Box>
    )

}

export default ViolationsOpen;

