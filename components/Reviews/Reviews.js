import { Box, Button, Flex, Spacer, Text, Image, Icon } from "@chakra-ui/react";
import { MdStarRate } from 'react-icons/md';
import { DUMMY_DATA } from "./DUMMY_DATA";

const SingleReview = ({data}) => {
    //amount of review stars
    let stars = []
    for(let i=0; i<data.rating; i++){
        stars.push(i)
    }


    return (
        <Box marginTop={5} overflowY="auto" maxHeight="150px" w='100%' maxWidth='1000px'>
            <Flex>
                <Image borderRadius='full' boxSize='150px' src={data.profile_picture_url} alt='User Pfp' width='130px' height='130px'/>
                <Box>
                    <Box paddingLeft='5'>
                        <Flex minWidth={770} maxWidth={770}>
                            <Text fontWeight='medium' fontSize='md' marginRight={5}>{data.user}</Text>
                            <Flex color='red'>{stars.map(e => <Icon as={MdStarRate} w={5} h={5} marginRight={2} />)}</Flex>
                            <Spacer />
                            <Text textAlign='right' fontWeight='medium' fontSize='md' color='gray.400'>{data.createdDate}</Text>
                        </Flex>
                        <Text fontSize='md' marginRight={5} as='i'>{data.description}</Text>                      
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

const Reviews = () => {
    return(
        <Box overflowY="auto" maxHeight="650px">
            <Text fontWeight='bold' fontSize='xl' textAlign='center'>Recommended Reviews</Text>
            {DUMMY_DATA.map(e => <SingleReview key={e.id} data={e}/>)}
        </Box>
    )
}

export default Reviews;