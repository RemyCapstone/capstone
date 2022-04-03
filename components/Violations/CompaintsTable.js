import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import {useState} from 'react';

const ComplaintsTable = ({data}) => {
    //console.log(data)
        return(
            <Box overflowY="auto" maxHeight="500px">
                <Table variant='striped' colorScheme='gray'>
                    <TableCaption position="sticky" bottom={0} bgColor="white">Complaint History ({data.length} complaints displayed)</TableCaption>
                    <Thead position="sticky" top={0} bgColor="white">
                        <Tr>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th>Category</Th>
                            <Th>Type</Th>
                            <Th>Space</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map(complaint => {
                                return (
                                    <Tr key={complaint.complaintid}>
                                        <Td>{complaint.statusdate.substring(0,complaint.statusdate.indexOf('T'))}</Td>
                                        <Td><Text>{complaint.type === 'EMERGENCY' ? 'EMERGENCY' : 'NON EMERGENCY'}</Text></Td>
                                        <Td>{complaint.majorcategory}</Td>
                                        <Td>{complaint.minorcategory} {complaint.code !== 'N/A' && `(${complaint.code})`}</Td>
                                        <Td>{complaint.spacetype}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>
        )
}

export default ComplaintsTable;