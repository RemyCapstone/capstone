import { Box, Flex, Spacer, Text, Image, Icon, } from "@chakra-ui/react";
import { MdStarRate } from 'react-icons/md';
import { server } from '../../config/index'; // dynamic absolute routes



const SingleReview = ({data}) => {
    console.log('Data passed to single review:', data)
    //amount of review stars
    let stars = []
    for(let i=0; i< data.stars; i++){
        stars.push(i)
    }

    return (
        <Box marginTop={5} overflowY="auto" maxHeight="150px" w='100%' maxWidth='1000px'>
            <Flex>
                {/* <Image borderRadius='full' boxSize='150px' src={data.profile_picture_url} alt='User Pfp' width='130px' height='130px'/> */}
                <Box>
                    <Box paddingLeft='5'>
                        <Flex minWidth={770} maxWidth={770}>
                            <Text fontWeight='medium' fontSize='md' marginRight={5}>{data.user}</Text>
                            <Flex color='red'>{stars.map((e,i) => <Icon key={i} as={MdStarRate} w={5} h={5} marginRight={2} />)}</Flex>
                            <Spacer />
                            {/* <Text textAlign='right' fontWeight='medium' fontSize='md' color='gray.400'>{data.createdAt}</Text> */}
                        </Flex>
                        <Text fontSize='md' marginRight={5} as='i'>{data.review}</Text>                      
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default SingleReview;