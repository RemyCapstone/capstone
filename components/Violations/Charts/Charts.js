import { Box, Flex, Spacer, Text, } from '@chakra-ui/layout';
import DonutChart from './DonutChart';
import BarChart from './BarChart';

const Charts = ({data, complaints}) => {
    //console.log(data)
        if(complaints.length === 0){
            return (
                <Text fontWeight={'medium'}>There is no history of complaints for this building.</Text>
            )
        }
        return(
            <>
            <Flex>
                <Box w='40%' overflowY="auto"><Text textAlign={'right'} fontSize='xl' fontWeight='medium'>Complaints Breakdown:</Text></Box>
                <Box w='55%' overflowY="auto">
                    <DonutChart data={data} />
                </Box>
            </Flex>
            <Text fontSize='xl' fontWeight='medium'>{complaints.length} Complaints issued since {complaints[complaints.length-1]?.statusdate.substring(0,complaints[complaints.length-1].statusdate.indexOf('-'))}:</Text>
            <Box w='full' overflowY="auto">
                    <BarChart data={complaints} />
            </Box>
            </>
        )
}

export default Charts;