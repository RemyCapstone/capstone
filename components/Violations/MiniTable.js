import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { GoQuestion } from 'react-icons/go';

const MiniTable = ({title, color, content, height, tooltip}) => {
    return(
        <Box w='33%'>
                <Table variant='striped' colorScheme={color} size="lg" height={height}>
                        <Thead position="sticky" top={0} bgColor="white">
                            <Tr>
                                <Th>{title}</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            <Tr>
                                <Td><Text fontWeight='medium' textAlign='center'>{tooltip ? <Tooltip label={tooltip} placement='right-end' bg='gray.50' color='black'>{content}</Tooltip> : content}</Text></Td>
                            </Tr>
                        </Tbody>
                </Table>
        </Box>
    )
}

export default MiniTable;