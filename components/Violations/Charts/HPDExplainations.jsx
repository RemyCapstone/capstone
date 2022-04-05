import {ListItem, UnorderedList} from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';

const HPDExplaination = () => {
    return (
        <Box w='100%' marginTop={3} p={5} border='1px' borderColor='gray.300' borderRadius={10}>
                        <Text color='gray.500' fontWeight={'medium'} fontSize={'2xl'}>What are HPD Violations?</Text>
                        <br />
                        <Text color='gray.500' fontSize={'lg'}>HPD Violations occur when an official City Inspector finds the conditions of a home in violation of the law. If not corrected, these violations incur fines for the owner—however, HPD Violations are notoriously unenforced by the City. These violations fall into four categories:</Text>
                        <br />
                        <Text color='gray.500' fontSize={'lg'}><span style={{fontWeight: 'bold'}}>Class A — </span>non-hazardous</Text>
                        <Box marginLeft={20} color='gray.500' style={{ textIndent: 10 }}>
                            <Text color='gray.500' fontSize={'lg'}><span style={{fontStyle: 'italic',}}>Examples:</span></Text>
                            <UnorderedList>
                                <ListItem>No peephole in the entrance door of the dwelling unit</ListItem>
                                <ListItem>Keeping of pigeons, chickens, etc. unlawfully</ListItem>
                                <ListItem>No street number on the front of the dwelling</ListItem>
                            </UnorderedList>
                        </Box>
                        <Text color='gray.500' fontSize={'lg'}><span style={{fontWeight: 'bold'}}>Class B — </span>hazardous</Text>
                        <Box marginLeft={20} color='gray.500' style={{ textIndent: 10 }}>
                            <Text color='gray.500' fontSize={'lg'}><span style={{fontStyle: 'italic',}}>Examples:</span></Text>
                            <UnorderedList>
                                <ListItem>Inadequate lighting facilities for public halls or stairs</ListItem>
                                <ListItem>Owner has not provided an approved smoke detector in dwelling unit</ListItem>
                                <ListItem>Unlawful bars or gates on windows opening to fire escapes</ListItem>
                            </UnorderedList>
                        </Box>
                        <Text color='gray.500' fontSize={'lg'}><span style={{fontWeight: 'bold'}}>Class C — </span>immediately hazardous</Text>
                        <Box marginLeft={20} color='gray.500' style={{ textIndent: 10 }}>
                            <Text color='gray.500' fontSize={'lg'}><span style={{fontStyle: 'italic',}}>Examples:</span></Text>
                            <UnorderedList>
                                <ListItem>Inadequate supply of heat and hot water</ListItem>
                                <ListItem>Pests (Rodents, Bed bugs)</ListItem>
                                <ListItem>Peeling lead paint in dwellings where a child under 7 resides</ListItem>
                                <ListItem>Broken or defective plumbing fixtures</ListItem>
                            </UnorderedList>
                        </Box>
                        <Text color='gray.500' fontSize={'lg'}><span style={{fontWeight: 'bold'}}>Class I — </span>fundamental property issue (e.g. landlord failed to register, Vacate Order issued)</Text>
                        <br />
                        <Text color='gray.500' fontSize={'lg'}>Read more about HPD Violations at the <span style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#7daffa', cursor: 'pointer'}}>
                            <a target="_blank" href="https://www1.nyc.gov/site/hpd/services-and-information/housing-quality-and-safety.page" rel="noopener noreferrer">official HPD page</a>
                        </span>.</Text>                    
        </Box>
    )
}

export default HPDExplaination;