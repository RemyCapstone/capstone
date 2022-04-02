import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Tooltip} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { GoQuestion } from 'react-icons/go';

const MiniTable = ({title, color, content, height, tooltip}) => {
    return(
        <Box w='33%'>
                <Table variant='striped' colorScheme={color} size="lg">
                        <Thead position="sticky" top={0} bgColor="white">
                            <Tr>
                                <Th>{tooltip ? <Tooltip label={tooltip} placement='right-end' bg='gray.50' color='black'>{title}</Tooltip> : title}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Box overflowY="auto" height={height}>
                                        <Text fontWeight='medium' textAlign='center' fontSize='sm'>{content}</Text>
                                    </Box>
                                </Td>
                            </Tr>
                        </Tbody>
                </Table>
        </Box>
    )
}

export default MiniTable;