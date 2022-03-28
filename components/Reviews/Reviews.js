import { Box, Button, Flex, Spacer, Text, Image, Icon, Textarea,
Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, UnorderedList, ListItem } from "@chakra-ui/react";
import { MdStarRate } from 'react-icons/md';
import {BsStar, BsStarFill} from 'react-icons/bs'
import { DUMMY_DATA } from "./DUMMY_DATA";
import { useSession } from 'next-auth/react';
import { useState } from "react";

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
    const { data : session} = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [starFilled, setStarFilled] = useState(0)
    const [textValue, setTextValue] = useState('')

    const handleStarHover = (position) => {
        setStarFilled(position)
        //console.log(position)
    }

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setTextValue(inputValue)
    }

    return(
        <>
        <Box overflowY="auto" maxHeight="650px">
            <Text fontWeight='bold' fontSize='xl' textAlign='center'>Recommended Reviews</Text>
            {DUMMY_DATA.map(e => <SingleReview key={e.id} data={e}/>)}
        </Box>

        <Flex>
        <Text marginTop={10} fontSize='3xl' fontWeight='bold' >Review this building:</Text>
        <Spacer />
        <Text onClick={onOpen} cursor='pointer' marginTop={10} fontSize='md' fontWeight='bold' paddingTop={4} color='teal.500'>Read our review guidelines</Text>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent maxW="56rem">
                <ModalHeader>Review Content Guidelines</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box overflowY="auto" maxHeight="650px">
                        <Text>People come to Remy to obtain information they normally would not know about pertaining to a wide spread of apartments. We know that people won’t 
                        always agree, but we expect everyone on the site to treat one another and the platform with honesty and respect. We’ve put together 
                        these general guidelines to help set the tone for discourse on the site—just in case. </Text>

                        <UnorderedList padding='5'>
                            <ListItem><span style={{fontWeight: 'bold'}}>Relevance: </span> Please make sure your contributions are appropriate to the forum. For example, reviews aren’t the place for rants about political ideologies, extraordinary circumstances, or other matters that don’t address the core of the potential tenant's experience.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Inappropriate content: </span> Colorful language and imagery are fine, but there’s no place for threats, harassment, lewdness, hate speech, or other displays of bigotry.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Conflicts of interest: </span> Your contributions to Remy should be unbiased and objective. For example, you shouldn’t write reviews of an apartment you own, your friends’ or relatives’ property, your peers or anyone in your networking group. Landlords should never ask customers to write reviews.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Privacy: </span> Don’t publicize people’s private information. Don’t post other people’s full names unless you’re referring to someone who is commonly referred to by their full name.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Personal experience: </span> We want to hear about your firsthand experience, not what you heard from your partner or co-worker, or what you saw in the news. Tell your own story without resorting to broad generalizations and conclusory allegations.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Accuracy: </span> Make sure your review is factually correct. Feel free to air your opinions, but don’t exaggerate or misrepresent your experience. We don’t take sides when it comes to factual disputes, so we expect you to stand behind your review.</ListItem>
                            <ListItem><span style={{fontWeight: 'bold'}}>Demanding payment: </span>Writing a review should be informative and meant to help the broader Remy community. You should not threaten to post or offer to remove a negative review as a way to extract payment from a business.</ListItem>
                        </UnorderedList>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Box marginTop={4} border='1px' borderColor='gray.300' minHeight='400px'>
            <Flex padding={6}>
                <Flex>
                    <Icon cursor='pointer' as={starFilled === 0 ? BsStar : BsStarFill} w={8} h={8} marginRight={2} color={starFilled === 0 ? 'gray.400' : 'red.400'} onClick={() => handleStarHover(1)} />
                    <Icon cursor='pointer' as={starFilled < 2 ? BsStar: BsStarFill} w={8} h={8} marginRight={2} color={starFilled < 2 ? 'gray.400' : 'red.400'} onClick={() => handleStarHover(2)} />
                    <Icon cursor='pointer' as={starFilled < 3 ? BsStar: BsStarFill} w={8} h={8} marginRight={2} color={starFilled < 3 ? 'gray.400' : 'red.400'} onClick={() => handleStarHover(3)} />
                    <Icon cursor='pointer' as={starFilled < 4 ? BsStar: BsStarFill} w={8} h={8} marginRight={2} color={starFilled < 4 ? 'gray.400' : 'red.400'} onClick={() => handleStarHover(4)} />
                    <Icon cursor='pointer' as={starFilled < 5 ? BsStar: BsStarFill} w={8} h={8} marginRight={2} color={starFilled < 5 ? 'gray.400' : 'red.400'} onClick={() => handleStarHover(5)} />
                    <Text fontSize='xl' paddingTop={.5} marginLeft={6}>
                        {starFilled === 0 ? 'Select your rating': starFilled === 1 ? 'Horrible experience' : starFilled === 2 ? 'Could have been better' : starFilled === 3 ? 'It was alright' : starFilled === 4 ? 'Pretty good' : 'Great experience'}
                    </Text>
                </Flex>
            </Flex>
            <Box padding={6} paddingTop={4}>
            <Textarea
                padding={6}
                value={textValue}
                onChange={handleInputChange}
                placeholder='Write review in this text box. Remember to follow our guidelines on how to write a proper review or else yours may be removed.'
                size='lg'
                minHeight='200px'
            />
            </Box>

            <Box marginLeft={6}>
                <Button colorScheme='teal' size='lg'>
                    Post your review
                </Button>
            </Box>
        </Box>
        </>
    )
}

export default Reviews;