import { Center, ListItem, UnorderedList, Grid, GridItem, Flex, Box, Text, Icon } from '@chakra-ui/react';
import {GiFamilyHouse} from 'react-icons/gi';
import {BiBuildingHouse} from 'react-icons/bi';
import {FaHotel} from 'react-icons/fa';

const AboutPage = () => {
    return (
        <Box>
            <Flex justifyContent='center' alignItems='center' >
                <Text fontSize='4xl' p='10' fontWeight='bold' color='red.600'>
                    So your building isn't registered, what does this mean?
                </Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Text fontSize='2xl' p='4' color='gray.600'>
                    Buildings without valid property registration are subject to the following:

                    <Box>
                    <UnorderedList padding='5'>
                    <ListItem>Civil penalties of $250-$500</ListItem>
                    <ListItem>May be issued official Orders</ListItem>
                    <ListItem>Ineligible to certify violations</ListItem>
                    <ListItem>Unable to request Code Violation Dismissals</ListItem>
                    <ListItem>Lowest priority for a court action for eviction of tenant.</ListItem>
                    <ListItem>Unable to file dismissal requests.</ListItem>
                    <ListItem>Unable to request violation reissuances.</ListItem>
                    </UnorderedList>
                    </Box>
                </Text>
            </Flex>

            <Flex justifyContent='center' alignItems='center'>
                <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'>
                    Who is required to register with HPD?
                </Text>
            </Flex>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={BiBuildingHouse} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Multifamily dwellings</Text>
                        <Text fontSize='2xl' textAlign='center' color='gray.600'>(3+ units in a single building)</Text>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={GiFamilyHouse} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Private dwellings</Text>
                        <Text fontSize='2xl'textAlign='center' color='gray.600'>(1-2 units) where neither the owner nor the owner’s immediate family resides.</Text>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={FaHotel} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Hotels & condominiums</Text>
                        <Text fontSize='2xl'textAlign='center' color='gray.600'>Co-ops are also included.</Text>
                    </Box>
                </GridItem>
            </Grid>

            <Flex justifyContent='center' alignItems='center' paddingTop='10'>
                <Text fontSize='4xl' p='10' fontWeight='bold' color='blue.700'>
                    Is this your property?
                </Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Text fontSize='2xl' p='4' color='gray.600'>
                    The easiest way to register is by using <a href='https://a806-pros.nyc.gov/PROS/mdRInternet.html'><Text as='u'>HPD's Property Registration Online System (PROS)</Text></a>. With this tool, owners and managers can:
                    
                    <Box>
                    <UnorderedList padding='5'>
                    <ListItem>Update registration forms annually or as changes occur. (You still need to print, sign and mail).</ListItem>
                    <ListItem>Create new property registrations.</ListItem>
                    <ListItem>Ineligible to certify violations</ListItem>
                    <ListItem>Review and print a building's registration history and any submitted forms.</ListItem>
                    <ListItem>Receive notifications electronically when forms are accepted or rejected.</ListItem>
                    <ListItem>Unable to file dismissal requests.</ListItem>
                    <ListItem>Link to the Department of Finance (DOF) for payment of the property registration fee.</ListItem>
                    </UnorderedList>
                    </Box>
                </Text>
            </Flex>
        </Box>



    );
}

export default AboutPage;