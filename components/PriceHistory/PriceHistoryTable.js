import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import millify from 'millify';


const PriceHistoryTable = ({data}) => {

    return(
        <>
            <Table variant='simple'>
                <TableCaption>Price History</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>2022</Td>
                        <Td>$123123213</Td>
                    </Tr>
                    <Tr>
                        <Td>2021</Td>
                        <Td>$34636546</Td>
                    </Tr>
                    <Tr>
                        <Td>2020</Td>
                        <Td>$56756</Td>
                    </Tr>
                    <Tr>
                        <Td>2019</Td>
                        <Td>$56asd756</Td>
                    </Tr>
                    <Tr>
                        <Td>2018</Td>
                        <Td>$567s56</Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    )
}

export default PriceHistoryTable;