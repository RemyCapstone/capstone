import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import DonutChart from './DonutChart';

const Charts = ({data}) => {
    //console.log(data)
        return(
            <Box overflowY="auto" height="500px">
                <Box w='50%' overflowY="auto" height="500px">
                    <DonutChart data={data} />
                </Box>
            </Box>
        )
}

export default Charts;