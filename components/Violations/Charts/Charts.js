import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import DonutChart from './DonutChart';
import BarChart from './BarChart';

const Charts = ({data, complaints}) => {
    //console.log(data)
        return(
            <>
            <Flex>
                <Box w='40%' overflowY="auto"></Box>
                <Box w='55%' overflowY="auto">
                    <Text textAlign={'center'} fontSize='xl' fontWeight='medium'>Categorized Complaints:</Text>
                    <DonutChart data={data} />
                </Box>
            </Flex>
            <Text fontSize='xl' fontWeight='medium'>Complaints Timeline:</Text>
            <Box w='full' overflowY="auto">
                    <BarChart data={complaints} />
            </Box>
            </>
        )
}

export default Charts;