import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { BsFilter } from 'react-icons/bs';
import {useState, useEffect} from 'react';
import { violationOptions, plutoOptions, complaint311Options, fetchOpenApi, processComplaints } from "../../utils/hpdViolations";
import MiniTable from './MiniTable';
import ViolationsTable from './ViolationsTable';
import ComplaintsTable from './CompaintsTable';
import { hashMapBuilder } from '../../utils/hashMapBuilder';

const Violations = ({data, registered}) => {
    const [violationsData, setViolationsData] = useState([]);
    const [complaintsData, setComplaintsData] = useState([]);
    const [filterComplaint, setFilterComplaint] = useState('');
    const [units, setUnits] = useState(0);
    const [viewViolations, setViewViolations] = useState(false);
    const [viewComplaints, setViewComplaints] = useState(false);
    const [toggleCheckBox, setCheckBox] = useState(false);
    //console.log(data)

   

    const openViolations = violationsData.filter(vio => vio.violationstatus === 'Open')
    
    let avgVio = 'N/A'
    if(units && units !== 0) avgVio = openViolations.length === 0 ? 0 : Math.round((openViolations.length / units.unitstotal) * 100) / 100

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

    useEffect(() => {
        if(data){
            const options = complaint311Options(data.buildingid);
            fetchOpenApi(options).then((response) => {
                return response;
            }).then((response) => {
                let complaintDescriptions = processComplaints(response);
                return complaintDescriptions
            }).then((complaintDescriptions) => {
                setComplaintsData(complaintDescriptions);
            })
        }
    }, [data]);
    
    const handleCheck = () => { 
        setCheckBox(!toggleCheckBox)
    }; 

    const handleSelect = (value) => {
        setFilterComplaint(value)
        //console.log(value)
    }

    //console.log(violationsData)
    //console.log(units)
    //console.log(complaintsData)

    //check if complaints have been gotten
    let complaintsDescriptions = []
    if(complaintsData.length > 0){
        for(let i = 0; i < complaintsData.length; i++){
            //[0] is the actual data
            complaintsDescriptions.push(complaintsData[i][0])
        }

        //console.log(complaintsDescriptions)
    }
    complaintsDescriptions.sort((a, b) => (a.statusdate < b.statusdate) ? 1 : -1)
    let filteredComplaints = complaintsDescriptions;
    const investigatedComplaints = complaintsDescriptions.filter(complaints => complaints.status === 'CLOSE')
    if(filterComplaint !== ''){
        //console.log(filterComplaint)
        filteredComplaints = complaintsDescriptions.filter(complaint =>
            complaint.majorcategory.includes(filterComplaint) || complaint.minorcategory.includes(filterComplaint) || complaint.code.includes(filterComplaint)
        )
    }

    let complaintCategories = hashMapBuilder(filteredComplaints, 'majorcategory');
    let sortableCategories = [];
    for (var complaint in complaintCategories) {
        sortableCategories.push([complaint, complaintCategories[complaint]]);
    }
    sortableCategories.sort(function(a, b) {
        return b[1] - a[1];
    });
    if(sortableCategories.length > 4){
        sortableCategories = sortableCategories.slice(0, 4) // only get the first few
    }
    console.log(sortableCategories)   //comment this out

    

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
                <MiniTable title='Total Residential Units' color='twitter' content={units && units !== 0 ? `${units.unitstotal} units` : 'Not available'} tooltip='Used for calculating average amount of violations per unit. Naturally, buildings with more units will have more violations so using the average is a good method.'/>
            </Flex>
            <Flex>
                <MiniTable title='Total Violations' color='orange' content={`${violationsData.length} total HPD violations in this building`} height='80px' tooltip='This includes the history of every violation submitted for this building, both closed and open.'/>
                <MiniTable title='Current Open Violations' color='red' content={`${openViolations.length} HPD violations are open. Average: ${avgVio} violations per unit.`} height='80px' tooltip='Open violations are ones that have yet to be fixed. Average is calculated using the total residential units, the citywide average of 0.8 per residential unit.'/>
                <MiniTable title='Landlord/ Owner' color='purple' content={units && units !== 0 ? units.ownername : 'Not available'} height='80px' tooltip='Most common name associated with the building'/>
            </Flex>
            <Flex borderBottom='1px' borderColor='gray.300' paddingBottom={5}>
                <MiniTable title='Total 311 Complaints' color='yellow' content={`${complaintsData.length} total 311 complaints in this building`} height='80px' tooltip='This includes the history of every 311 complaint submitted for this building, both closed and open.'/>
                <MiniTable title='Open Investigations' color='pink' content={`${investigatedComplaints.length} out of ${complaintsData.length} complaints have been investigated.`} height='80px' tooltip='Open investigations are the 311 calls that have yet to be investigated.'/>
                <MiniTable title='Most Common Categories' color='green' content={sortableCategories.map(e => `${e[0]} (${e[1]}), `)} height='80px' tooltip='Complaints categorized into their most common types (heating, plumbing, sanitary conditions, etc.)'/>
            </Flex>

            <Flex onClick={() => setViewComplaints(!viewComplaints)} cursor='pointer' bg='gray.50' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='medium' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>View All Complaints</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {viewComplaints && <Flex justifyContent='right'>
                <Select onChange={(e) => handleSelect(e.target.value)} placeholder={'No Filter Applied'} w='fit-content' p='2'>
                        <option value={'HEAT'}>
                            {'HEAT'}
                        </option>
                        <option value={'UNSANITARY CONDITION'}>
                            {'UNSANITARY CONDITION'}
                        </option>
                        <option value={'WATER'}>
                            {'WATER'}
                        </option>
                        <option value={'PLUMBING'}>
                            {'PLUMBING'}
                        </option>
                        <option value={'ELECTRIC'}>
                            {'ELECTRIC'}
                        </option>
                        <option value={'SAFETY'}>
                            {'SAFETY'}
                        </option>
                        <option value={'DOOR/WINDOW'}>
                            {'DOOR/WINDOW'}
                        </option>
                        <option value={'PAINT/PLASTER'}>
                            {'PAINT/PLASTER'}
                        </option>
                        <option value={'APPLIANCE'}>
                            {'APPLIANCE'}
                        </option>
                        <option value={'GENERAL'}>
                            {'GENERAL'}
                        </option>
                        <option value={'FLOORING/STAIRS'}>
                            {'FLOORING/STAIRS'}
                        </option>
                </Select>
            </Flex>}
            {viewComplaints && <ComplaintsTable data={filteredComplaints} />}

            <Flex onClick={() => setViewViolations(!viewViolations)} marginTop={5}  cursor='pointer' bg='gray.50' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='medium' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>View All Violations</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {viewViolations && <Flex justifyContent='right'>
                <Checkbox size='md' colorScheme='green' onChange={handleCheck} padding='3' defaultChecked={toggleCheckBox}>
                    Only Show Open Violations
                </Checkbox>
            </Flex>}
            {viewViolations && <ViolationsTable data={toggleCheckBox ? openViolations : violationsData} />}


            
        </Box>
    )
}

export default Violations;