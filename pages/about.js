import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from "../components/NavBar";
import { Center, Square, Circle, Grid, GridItem, Flex, Box, Text, Icon } from '@chakra-ui/react';
import { FcBarChart, FcInspection, FcSearch, FcHome } from 'react-icons/fc';

const AboutPage = () => {
    return (
        <Box>
            <Flex justifyContent='center' alignItems='center' >
                <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'
                    sx={{
                        '@media only screen and (max-width: 1050px)': {
                        padding: '4',
                        textAlign: 'center'
                        },
                    }}
                >
                    Battling New York's Housing Crisis
                </Text>
            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Text
                    fontSize='1xl'
                    p='4'
                    color='gray.600'
                    textAlign='center'
                    sx={{
                        '@media only screen and (max-width: 1050px)': {
                          textAlign: 'left',
                        },
                    }}
                >
                    The market for apartment hunting sites currently does not provide an apartment
                    hunting solution that contains information pertaining to the building's current
                    conditions and how habitable it is now. There is also no way to get the experience
                    from past tenants unless you knew them personally.
                </Text>
            </Flex>

            <Flex justifyContent='center' alignItems='center'>
                <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'>
                    How Remy Shines
                </Text>
            </Flex>
            <Grid
                templateColumns='repeat(3, 1fr)'
                gap={6}
                sx={{
                    '@media only screen and (max-width: 1050px)': {
                      gridTemplateColumns: '1fr',
                    },
                }}
            >
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={FcBarChart} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Provide real data</Text>
                        <Text textAlign='center' color='gray.600'>We provide real estate data along with details of their past and current violations by incorporating HPD data and 311 complaints.</Text>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={FcInspection} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Hold landlords accountable</Text>
                        <Text textAlign='center' color='gray.600'>We show violations and ratings to make sure landlords avoid negligence and provide proper living conditions for their rental units.</Text>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='60' bg='gray.100' borderRadius='10'>
                    <Box p='3' paddingTop={5}>
                        <Flex justifyContent="center" alignItems="center">
                            <Icon as={FcSearch} w={50} h={50} />
                        </Flex>
                        <Text fontSize='2xl' fontWeight='bold' textAlign='center' color='gray.700' p='2'>Emphasize transparency</Text>
                        <Text textAlign='center' color='gray.600'>We want apartment hunters to have all the information they need before deciding on their next home within one search.</Text>
                    </Box>
                </GridItem>
            </Grid>

            <Flex justifyContent='center' alignItems='center' >
                <Text fontSize='4xl' p='10' fontWeight='bold' color='gray.700'>
                    Our Impact
                </Text>
            </Flex>
            <Grid
                minH='450px'
                templateRows='repeat(3, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={4}
                sx={{
                    '@media only screen and (max-width: 1050px)': {
                      gridTemplateColumns: '1fr',
                    },
                }}
            >

                <GridItem rowSpan={3} colSpan={1}
                    sx={{
                        '@media only screen and (max-width: 1050px)': {
                          gridColumn: 'auto',
                          gridRow: 'auto',
                          display: 'none',
                        },
                    }}
                >
                    <Icon as={FcHome} w={250} h={400}
                        sx={{
                            '@media only screen and (max-width: 1050px)': {
                              width: '50vw',
                            },
                        }}
                    />
                </GridItem>
                <GridItem colSpan={2}
                sx={{
                    '@media only screen and (max-width: 1050px)': {
                      gridColumn: 'auto',
                      padding: '4'
                    },
                }}>
                    <Text fontSize='4xl' fontWeight='bold' color='blue.500' p='3'>7,200 apartments</Text>
                    <Text fontSize='2xl' color='gray.600' p='3'>For New Yorkers to find</Text>
                </GridItem>
                <GridItem colSpan={2}
                    sx={{
                        '@media only screen and (max-width: 1050px)': {
                            gridColumn: 'auto',
                            padding: '4'
                        },
                    }}
                >
                    <Text fontSize='4xl' fontWeight='bold' color='red.500' p='3'>2.6 million complaints</Text>
                    <Text fontSize='2xl' color='gray.600' p='3'>Know what apartments to avoid</Text>
                </GridItem>
                <GridItem colSpan={2}
                    sx={{
                        '@media only screen and (max-width: 1050px)': {
                            gridColumn: 'auto',
                            padding: '4'
                        },
                    }}
                >
                    <Text fontSize='4xl' fontWeight='bold' color='green.400' p='3'>0 rats</Text>
                    <Text fontSize='2xl' color='gray.600' p='3'>In your new home (hopefully)</Text>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default AboutPage;