import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import millify from 'millify';


const Violations = ({data, registered}) => {
    //console.log(data)

    if(!registered){
        return (
            <Box overflowY="auto" maxHeight="500px">
                <Table variant='simple' colorScheme='facebook'>
                     <TableCaption position="sticky" bottom={0} bgColor="white">This building is not registered with the hpd and therefor has no history available.</TableCaption>
                     <Thead position="sticky" top={0} bgColor="white">
                        <Tr>
                            <Th>HPD VIOLATIONS DATA</Th>
                        </Tr>
                    </Thead>
                </Table>
            </Box>
        )
    }

    return(
        <Box overflowY="auto" maxHeight="350px">
            Building id: {data.buildingid}
        </Box>
    )
}

export default Violations;