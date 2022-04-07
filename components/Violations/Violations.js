import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Checkbox, Select, Center, Tooltip} from '@chakra-ui/react';
import { MdReportProblem } from 'react-icons/md';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
import Pests from './pestReport';
import ComplaintsTotal from './ComplaintsTotal';
import Charts from './Charts/Charts';
import BarChartVio from './Charts/BarChartVio';
import HPDExplaination from './Charts/HPDExplainations';

const Violations = ({data, registered}) => {
    const [violationsData, setViolationsData] = useState([]);
    const [complaintsData, setComplaintsData] = useState([]);
    const [filterComplaint, setFilterComplaint] = useState('');
    const [filterVio, setFilterVio] = useState('');
    const [units, setUnits] = useState(0);
    const [viewViolations, setViewViolations] = useState(false);
    const [viewComplaints, setViewComplaints] = useState(false);
    const [toggleCheckBox, setCheckBox] = useState(false);
    //console.log(data)

   

    const openViolations = violationsData.filter(vio => vio.violationstatus === 'Open')
    
    let avgVio = 'N/A'
    if(units && units !== 0) avgVio = openViolations.length === 0 ? 0 : Math.round((openViolations.length / units.unitstotal) * 100) / 100

    violationsData.sort((a, b) => (a.inspectiondate < b.inspectiondate) ? 1 : -1)
    let filteredVios = violationsData;
    if(filterVio !== ''){
        //console.log(filterVio)
        filteredVios = filteredVios.filter(vio =>
            vio.class.includes(filterVio)
        )
    }

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

    const handleSelectComplaints = (value) => {
        setFilterComplaint(value)
        //console.log(value)
    }

    const handleSelectViolations = (value) => {
        setFilterVio(value)
    }

    //console.log(violationsData)
    //console.log(units)
    //console.log('printing here', complaintsData)

    //check if complaints have been gotten
    let complaintsDescriptions = []
    if(complaintsData.length > 0){
        for(let i = 0; i < complaintsData.length; i++){
            //[0] is the actual data, if statement to avoid null data
            if(complaintsData[i][0]?.complaintid) complaintsDescriptions.push(complaintsData[i][0])
        }

        //console.log(complaintsDescriptions)
    }
    complaintsDescriptions.sort((a, b) => (a.statusdate < b.statusdate) ? 1 : -1)
    //console.log('test', complaintsDescriptions)
    let filteredComplaints = complaintsDescriptions;
    const investigatedComplaints = complaintsDescriptions.filter(complaints => complaints.status === 'CLOSE')
    const emergencyComplaints = complaintsDescriptions.filter(complaints => complaints.type === 'EMERGENCY')
    if(filterComplaint !== ''){
        //console.log(filterComplaint)
        filteredComplaints = complaintsDescriptions.filter(complaint =>
            complaint.majorcategory.includes(filterComplaint) || complaint.minorcategory.includes(filterComplaint) || complaint.code.includes(filterComplaint)
        )
    }
    let pestTag = complaintsDescriptions.filter(complaint => complaint.minorcategory.toUpperCase().includes("PESTS"))
    let bedBugs = complaintsDescriptions.filter(complaint => complaint.code.toUpperCase().includes("BUG"))
    let mice = complaintsDescriptions.filter(complaint => complaint.code.toUpperCase().includes("MICE") || complaint.code.toUpperCase().includes("MOUSE") || complaint.code.toUpperCase().includes("RAT"))
    let roach = complaintsDescriptions.filter(complaint => complaint.code.toUpperCase().includes("ROACH"))
    //console.log("Pests", bedBugs)

    
    let complaintCategories = hashMapBuilder(complaintsDescriptions, 'majorcategory');
    let sortableCategories = [];
    for (var complaint in complaintCategories) {
        sortableCategories.push([complaint, complaintCategories[complaint]]);
    }
    sortableCategories.sort(function(a, b) {
        return b[1] - a[1];
    });
    if(sortableCategories.length > 5){
        sortableCategories = sortableCategories.slice(0, 5) // only get the first few
    }
    //console.log(sortableCategories)   //comment this out

    

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
                                <Tooltip label={'Unique identifier for a building registered with the HPD.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #898C92', color: 'white', backgroundColor: '#595B5E', paddingRight: '.25em', paddingLeft: '.25em', borderRadius: '50%'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{data.buildingid}</Text>
                            <Box paddingTop={3} borderBottom='1px' borderColor='gray.400'></Box>
                            <br/>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Total Units `}
                                <Tooltip label={'Used for calculating average amount of violations per unit. Naturally, buildings with more units will have more violations so using the average is a good method.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #898C92', color: 'white', backgroundColor: '#595B5E', paddingRight: '.25em', paddingLeft: '.25em',  borderRadius: '50%'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{units && units !== 0 ? `${units.unitstotal} units` : 'Not available'}</Text> 
                        </Box>
                        <Box w='50%' textAlign='left' paddingLeft='20px'>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Boro-Block-Lot `}
                                <Tooltip label={'An indentifier used by the Department of Finance Tax Records and Primary Land Use Tax Lot Output.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #898C92', color: 'white', backgroundColor: '#595B5E', paddingRight: '.25em', paddingLeft: '.25em', borderRadius: '50%'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{`${data.boro}-${data.block}-${data.lot}`}</Text>
                            <Box paddingTop={3} borderBottom='1px' borderColor='gray.400'></Box>
                            <br/>
                            <Text textTransform='uppercase' fontWeight='semibold'>
                                {` Landlord/Owner `}
                                <Tooltip label={'Most common name associated with the building.'} placement='right-end' bg='gray.50' color='black'>
                                    <span style={{fontWeight: 'bold', border: '2px solid #898C92', color: 'white', backgroundColor: '#595B5E', paddingRight: '.25em', paddingLeft: '.25em', borderRadius: '50%'}}>{'?'}</span>
                                </Tooltip>
                            </Text>
                            <Text>{units && units !== 0 ? units.ownername : 'Not available'}</Text>
                        
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            

            {/* Violations table  */}
            <Flex onClick={() => setViewViolations(!viewViolations)} marginTop={2}  cursor='pointer' bg='gray.50' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='medium' fontSize='lg' justifyContent='center' alignItems='center'>
                <Text>View All Violations</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {viewViolations && 
                <Tabs variant='soft-rounded' p={3} isFitted>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Spreadsheet Summary</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Charts</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent='right'>
							<Checkbox size='md' colorScheme='green' onChange={handleCheck} padding='3' defaultChecked={toggleCheckBox}>
								Only Show Open Violations
							</Checkbox>
							 <Select onChange={(e) => handleSelectViolations(e.target.value)} placeholder={'No Filter Applied'} w='fit-content' p='2'>
												<option value={'A'}>
													{'Non-Hazardous'}
												</option>
												<option value={'B'}>
													{'Hazardous'}
												</option>
												<option value={'C'}>
													{'Immediately Hazardous'}
												</option>
										</Select>
						</Flex>
						<ViolationsTable data={toggleCheckBox ? openViolations : filteredVios} />
                        <HPDExplaination />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <BarChartVio data={violationsData} />
                        <HPDExplaination />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            }


            <br/><br/>



            {/*.............. 311 Complaints ..............*/}
            <Flex>
                <Text fontWeight='bold' fontSize='xl'>311 Complaints</Text>
            </Flex>
            <Flex>
                <Pests pestTag={pestTag} bedBugs={bedBugs} mice={mice} roach={roach}></Pests>
                <Center/>
                <ComplaintsTotal complaintsData={complaintsData} emergencyComplaints={emergencyComplaints}></ComplaintsTotal>
            </Flex>
            {/* Complaints table */}
            <Flex onClick={() => setViewComplaints(!viewComplaints)} cursor='pointer' bg='gray.50' borderBottom='1px' borderColor='gray.200' p='2' fontWeight='medium' fontSize='lg' justifyContent='center' alignItems='center' marginTop='10'>
                <Text>View All Complaints</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>
            {viewComplaints &&
                <Tabs variant='soft-rounded' p={3} isFitted>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Spreadsheet Summary</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Charts</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent='right'>
                            <Select onChange={(e) => handleSelectComplaints(e.target.value)} placeholder={'No Filter Applied'} w='fit-content' p='2'>
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
                        </Flex>
                        <ComplaintsTable data={filteredComplaints} />
                    </TabPanel>
                    <TabPanel>
                        <Charts data={sortableCategories} complaints={complaintsDescriptions} />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            }



            
    


            
        </Box>
    )
}

export default Violations;