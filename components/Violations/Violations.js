import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import millify from 'millify';
import {useState, useEffect} from 'react';
import { violationOptions, plutoOptions, fetchOpenApi } from "../../utils/hpdViolations";

const Violations = ({data, registered}) => {
    const [violationsData, setViolationsData] = useState([]);
    const [units, setUnits] = useState(0);
    //console.log(data)

    useEffect(() => {
        if(data){
            const options = violationOptions(data.buildingid);
            fetchOpenApi(options).then((response) => {
                //console.log(response);
                setViolationsData(response);
            })
        }
    }, [data]);

    useEffect(() => {
        if(data){
            const pluto = plutoOptions(data.boro, data.block, data.lot)
            fetchOpenApi(pluto).then((response) => {
                //console.log(response)
                setUnits(response[0])
            })
        }
    }, [data]);

    

    //console.log(violationsData)
    //console.log(units)

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
        <Box overflowY="auto" maxHeight="500px">
            <Table variant='simple' colorScheme='facebook'>
                     <Thead position="sticky" top={0} bgColor="white">
                        <Tr>
                            <Th>HPD VIOLATIONS DATA</Th>
                        </Tr>
                    </Thead>
            </Table>
            <Flex>
                <Box w='33%'>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead position="sticky" top={0} bgColor="white">
                            <Tr>
                                <Th>HPD Building ID</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{data.buildingid}</Td>
                            </Tr>
                        </Tbody>
                </Table>
                </Box>
                <Box w='33%'>
                    <Table variant='striped' colorScheme='blackAlpha'>
                        <Thead position="sticky" top={0} bgColor="white">
                            <Tr>
                                <Th>Boro-Block-Lot (BBL)</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{data.boro}-{data.block}-{data.lot}</Td>
                            </Tr>
                        </Tbody>
                </Table>
                </Box>
                <Box w='33%'>
                    <Table variant='striped' colorScheme='orange'>
                        <Thead position="sticky" top={0} bgColor="white">
                            <Tr>
                                <Th>Total Residential Units</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{units.unitstotal}</Td>
                            </Tr>
                        </Tbody>
                </Table>
                </Box>
            </Flex>
        </Box>
    )
}

export default Violations;