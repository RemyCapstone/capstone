import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';

const ViolationsTable = ({data}) => {
    //console.log(data)

    return(
        <Box overflowY="auto" maxHeight="500px">
            <Table variant='striped' colorScheme='gray'>
                <TableCaption position="sticky" bottom={0} bgColor="white">Violation History</TableCaption>
                <Thead position="sticky" top={0} bgColor="white">
                    <Tr>
                        <Th>Date</Th>
                        <Th>Status</Th>
                        <Th>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map(violation => {
                            return (
                                <Tr key={violation.violationid}>
                                    <Td>{violation.inspectiondate.substring(0,violation.inspectiondate.indexOf('T'))}</Td>
                                    <Td><Text color={violation.violationstatus === 'Open' && 'red'}>{violation.violationstatus}</Text></Td>
                                    <Td>{violation.novdescription}</Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </Box>
    )
}

export default ViolationsTable;