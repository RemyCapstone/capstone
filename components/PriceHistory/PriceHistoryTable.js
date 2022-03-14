import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import millify from 'millify';


const PriceHistoryTable = ({data}) => {
    //console.log(data)

    return(
        <Box overflowY="auto" maxHeight="350px">
            <Table variant='simple' colorScheme='facebook'>
                <TableCaption position="sticky" bottom={0} bgColor="white">Price History</TableCaption>
                <Thead position="sticky" top={0} bgColor="white">
                    <Tr>
                        <Th>Date</Th>
                        <Th>Event</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map(history => {
                            return (
                                <Tr key={history.time}>
                                    <Td>{history.date}</Td>
                                    <Td>{history.event}</Td>
                                    <Td>${history.price}</Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </Box>
    )
}

export default PriceHistoryTable;