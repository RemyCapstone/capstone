import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { BsFilter } from 'react-icons/bs';
import {useState, useEffect} from 'react';
import { violationOptions, plutoOptions, fetchOpenApi } from "../../utils/hpdViolations";
import MiniTable from './MiniTable';
import ViolationsTable from './ViolationsTable';

const Violations = ({data, registered}) => {
    const [violationsData, setViolationsData] = useState([]);
    const [units, setUnits] = useState(0);
    const [viewViolations, setViewViolations] = useState(false);
    const [toggleCheckBox, setCheckBox] = useState(false);
    //console.log(data)

   

    const openViolations = violationsData.filter(vio => vio.violationstatus === 'Open')
    const avgVio = openViolations.length === 0 ? 0 : Math.round((openViolations.length / units.unitstotal) * 100) / 100

    violationsData.sort((a, b) => (a.inspectiondate < b.inspectiondate) ? 1 : -1)

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

      const handleCheck = () => { 
        setCheckBox(!toggleCheckBox)
    }; 

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
        <Box overflowY="auto" borderBottom='1px' borderColor='gray.300'>
            <Table variant='simple' colorScheme='facebook'>
                     <Thead position="sticky" top={0} bgColor="white">
                        <Tr>
                            <Th>HPD VIOLATIONS DATA</Th>
                        </Tr>
                    </Thead>
            </Table>
            <Flex>
                <MiniTable title='HPD Building ID' color='teal' content={data.buildingid} tooltip='Unique identifier for a building registered with the HPD'/>
                <MiniTable title='Boro-Block-Lot (BBL)' color='blackAlpha' content={`${data.boro}-${data.block}-${data.lot}`} tooltip='An indentifier used by the Department of Finance Tax Records and Primary Land Use Tax Lot Output'/>
                <MiniTable title='Total Residential Units' color='twitter' content={`${units.unitstotal} units`} tooltip='Used for calculating average amount of violations per unit. Naturally, buildings with more units will have more violations so using the average is a good method.'/>
            </Flex>
            <Flex borderBottom='1px' borderColor='gray.300' paddingBottom={5}>
                <MiniTable title='Total Violations' color='orange' content={`${violationsData.length} total HPD violations in this building`} height='40' tooltip='This includes the history of every violation submitted for this building, both closed and open.'/>
                <MiniTable title='Current Open Violations' color='red' content={`${openViolations.length} HPD violations are open. Average: ${avgVio} violations per unit.`} height='40' tooltip='Open violations are ones that have yet to be fixed. Average is calculated using the total residential units, the citywide average of 0.8 per residential unit.'/>
                <MiniTable title='Landlord/ Owner' color='purple' content={units.ownername} height='40' tooltip='Most common name associated with the building'/>
            </Flex>

            <Flex onClick={() => setViewViolations(!viewViolations)} cursor='pointer' bg='gray.50' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='medium' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>View All Violations</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {viewViolations && <Flex justifyContent='right'>
                <Checkbox size='md' colorScheme='green' onChange={handleCheck} padding='3'>
                    Only Show Open Violations
                </Checkbox>
            </Flex>}
            {viewViolations && <ViolationsTable data={toggleCheckBox ? openViolations : violationsData} />}
        </Box>
    )
}

export default Violations;