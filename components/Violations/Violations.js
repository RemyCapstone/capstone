import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip, Tag} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { BsFilter } from 'react-icons/bs';
import {useState, useEffect} from 'react';
import { violationOptions, plutoOptions, complaint311Options, fetchOpenApi, processComplaints } from "../../utils/hpdViolations";
import MiniTable from './MiniTable';
import ViolationsTable from './ViolationsTable';
import ComplaintsTable from './CompaintsTable';
import { hashMapBuilder } from '../../utils/hashMapBuilder';
// import below is from me
import ViolationsOpen from './ViolationsOpen';
import ViolationsTotal from './ViolationsTotal';

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

    let complaintCategories = hashMapBuilder(complaintsDescriptions, 'majorcategory');
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
                <Flex>
                    <Text fontWeight='bold' fontSize='xl'>HPD Violations Data</Text>
                </Flex>
                <br/>
                <Center>
                    <Text color='gray.600' fontWeight='semibold'>This building is not registered with the HPD and therefore has no history available.</Text>
                </Center>
            </Box>
        )
    }

    return(
        <Box overflowY="auto" borderBottom='1px' borderColor='gray.300'>

            {/*.............. HPD Violations Data ..............*/}
            <Flex>
                <Text fontWeight='bold' fontSize='xl'>HPD Violations Data</Text>
            </Flex>
            <br/>
            <Flex>
                <Box w='40%'>
                    <Flex>
                        {/*Passing over openViolations into ViolationsOpen component*/}
                        <ViolationsOpen data={openViolations} avgViolations={avgVio}></ViolationsOpen>
                    </Flex>
                    <br/>  
                    <Flex>
                        {/*Passing over violationsData into ViolationsTotal component*/}
                        <ViolationsTotal data={violationsData}></ViolationsTotal>
                    </Flex>   
                </Box>
                <Spacer />
                <Box w='50%'>
                    <Flex>
                        <Box w='50%' textAlign='left'>
                            <Text textTransform='uppercase' fontWeight='semibold'> 
                                {`HPD Building ID `}
                                <Tooltip label={'Unique identifier for a building registered with the HPD'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #666', color: 'white', backgroundColor: '#38393b', paddingRight: '.25em', paddingLeft: '.25em'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{data.buildingid}</Text>
                            <Box paddingTop={3} borderBottom='1px' borderColor='gray.400'></Box>
                            <br/>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Total Units `}
                                <Tooltip label={'Used for calculating average amount of violations per unit. Naturally, buildings with more units will have more violations so using the average is a good method.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #666', color: 'white', backgroundColor: '#38393b', paddingRight: '.25em', paddingLeft: '.25em'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{units && units !== 0 ? `${units.unitstotal} units` : 'Not available'}</Text> 
                        </Box>
                        <Box w='50%' textAlign='left' paddingLeft='20px'>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Boro-Block-Lot `}
                                <Tooltip label={'An indentifier used by the Department of Finance Tax Records and Primary Land Use Tax Lot Output.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #666', color: 'white', backgroundColor: '#38393b', paddingRight: '.25em', paddingLeft: '.25em'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{`${data.boro}-${data.block}-${data.lot}`}</Text>
                            <Box paddingTop={3} borderBottom='1px' borderColor='gray.400'></Box>
                            <br/>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Landlord/Owner `}
                                <Tooltip label={'Most common name associated with the building.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #666', color: 'white', backgroundColor: '#38393b', paddingRight: '.25em', paddingLeft: '.25em'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{units && units !== 0 ? units.ownername : 'Not available'}</Text>
                        
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            {/* Violations table  */}
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


            <br/><br/>



            {/*.............. 311 Complaints ..............*/}
            <Flex>
                <Text fontWeight='bold' fontSize='xl'>311 Complaints</Text>
            </Flex>
            <Flex borderBottom='1px' borderColor='gray.300' paddingBottom={5}>
                <MiniTable title='Total 311 Complaints' color='yellow' content={`${complaintsData.length} total 311 complaints in this building`} height='80px' tooltip='This includes the history of every 311 complaint submitted for this building, both closed and open.'/>
                <MiniTable title='Open Investigations' color='pink' content={`${investigatedComplaints.length} out of ${complaintsData.length} complaints have been investigated.`} height='80px' tooltip='Open investigations are the 311 calls that have yet to be investigated.'/>
                <MiniTable title='Most Common Categories' color='green' content={sortableCategories.map(e => `${e[0]} (${e[1]}), `)} height='80px' tooltip='Complaints categorized into their most common types (heating, plumbing, sanitary conditions, etc.)'/>
            </Flex>
            {/* Complaints table */}
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


            
    


            
        </Box>
    )
}

export default Violations;