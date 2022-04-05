import { Box, Button, Flex, Spacer, Text, Icon, Textarea,
Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, UnorderedList, ListItem, useToast } from "@chakra-ui/react";
import {BsStar, BsStarFill} from 'react-icons/bs'
import { DUMMY_DATA } from "./DUMMY_DATA";
import { useSession } from 'next-auth/react';
import { useState } from "react";
import Link from 'next/link';
import SingleReview from "./SingleReview";
import { useRouter } from "next/router";
const Star = ({value, starFilled, handleHoverStar, handleClickStar}) => { 
    if (!handleClickStar)
        handleClickStar = () => {};
    return (
        <Icon cursor='pointer' as={starFilled < value ? BsStar: BsStarFill} w={8} h={8} marginRight={2} color={starFilled < value ? 'gray.400' : 'red.400'} onMouseOver={() => handleHoverStar(value) } onClick={() => handleClickStar(value)} />
    );
}

const Reviews = ({zpid, postReviewHandler, userReview, propertyReviews}) => {
    const { data : session} = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ starFilled, setStarFilled ] = useState(0)
    const [selectedStar, setSelectedStar] = useState(false);
    const [ textValue, setTextValue ] = useState('')
    const toast = useToast();
    const router = useRouter();
    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setTextValue(inputValue)
    }

    const handleHoverStar = (position) => {
        if(!selectedStar) 
            setStarFilled(position);
    }

    const handleClickStar = (position) => {
        setSelectedStar(true);
        setStarFilled(position);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const values = {
        userid: session.user._id,
        zpid: zpid,
        stars: starFilled,
        review: textValue,
        createdAt: new Date(),
        lastEdited: new Date(),
      };
      
      const result = await postReviewHandler(values);

      console.log(result.data.message)
      
      if (result.status === 201) {
        toast({
          title: 'Review posted',
          description: 'Thanks for telling us how you feel about this property!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setStarFilled(0);
        setTextValue("");
      }
      router.reload(window.location.pathname)
      
    }
    return (
      <>
        {userReview ? (
          <Box>
            <Text fontWeight="bold" fontSize="xl" textAlign="center">
              Your Review
            </Text>
            <SingleReview data={userReview} />
          </Box>
        ) : null}
        <Box overflowY="auto" maxHeight="650px">
          <Text fontWeight="bold" fontSize="xl" textAlign="center">
            Property Reviews
          </Text>
          {propertyReviews
            ? propertyReviews.map((e) => <SingleReview key={e.id} data={e} />)
            : null}
        </Box>
        {!userReview && (
          <Flex>
            <Text marginTop={10} fontSize="3xl" fontWeight="bold">
              {" "}
              Review this building:{" "}
            </Text>
            <Spacer />
            <Text
              onClick={onOpen}
              cursor="pointer"
              marginTop={10}
              fontSize="md"
              fontWeight="bold"
              paddingTop={4}
              color="teal.500"
            >
              {" "}
              Read our review guidelines{" "}
            </Text>
          </Flex>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="56rem">
            <ModalHeader>Review Content Guidelines</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box overflowY="auto" maxHeight="650px">
                <Text>
                  People come to Remy to obtain information they normally would
                  not know about pertaining to a wide spread of apartments. We
                  know that people won’t always agree, but we expect everyone on
                  the site to treat one another and the platform with honesty
                  and respect. We’ve put together these general guidelines to
                  help set the tone for discourse on the site—just in case.{" "}
                </Text>

                <UnorderedList padding="5">
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>Relevance: </span>{" "}
                    Please make sure your contributions are appropriate to the
                    forum. For example, reviews aren’t the place for rants about
                    political ideologies, extraordinary circumstances, or other
                    matters that don’t address the core of the potential
                    tenant's experience.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>
                      Inappropriate content:{" "}
                    </span>{" "}
                    Colorful language and imagery are fine, but there’s no place
                    for threats, harassment, lewdness, hate speech, or other
                    displays of bigotry.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>
                      Conflicts of interest:{" "}
                    </span>{" "}
                    Your contributions to Remy should be unbiased and objective.
                    For example, you shouldn’t write reviews of an apartment you
                    own, your friends’ or relatives’ property, your peers or
                    anyone in your networking group. Landlords should never ask
                    customers to write reviews.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>Privacy: </span> Don’t
                    publicize people’s private information. Don’t post other
                    people’s full names unless you’re referring to someone who
                    is commonly referred to by their full name.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>
                      Personal experience:{" "}
                    </span>{" "}
                    We want to hear about your firsthand experience, not what
                    you heard from your partner or co-worker, or what you saw in
                    the news. Tell your own story without resorting to broad
                    generalizations and conclusory allegations.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>Accuracy: </span> Make
                    sure your review is factually correct. Feel free to air your
                    opinions, but don’t exaggerate or misrepresent your
                    experience. We don’t take sides when it comes to factual
                    disputes, so we expect you to stand behind your review.
                  </ListItem>
                  <ListItem>
                    <span style={{ fontWeight: "bold" }}>
                      Demanding payment:{" "}
                    </span>
                    Writing a review should be informative and meant to help the
                    broader Remy community. You should not threaten to post or
                    offer to remove a negative review as a way to extract
                    payment from a business.
                  </ListItem>
                </UnorderedList>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {session && !userReview && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box
              marginTop={4}
              border="1px"
              borderColor="gray.300"
              minHeight="400px"
            >
              <Flex padding={6}>
                <Flex>
                  <Star
                    value={1}
                    starFilled={starFilled}
                    handleHoverStar={handleHoverStar}
                    handleClickStar={handleClickStar}
                  />
                  <Star
                    value={2}
                    starFilled={starFilled}
                    handleHoverStar={handleHoverStar}
                    handleClickStar={handleClickStar}
                  />
                  <Star
                    value={3}
                    starFilled={starFilled}
                    handleHoverStar={handleHoverStar}
                    handleClickStar={handleClickStar}
                  />
                  <Star
                    value={4}
                    starFilled={starFilled}
                    handleHoverStar={handleHoverStar}
                    handleClickStar={handleClickStar}
                  />
                  <Star
                    value={5}
                    starFilled={starFilled}
                    handleHoverStar={handleHoverStar}
                    handleClickStar={handleClickStar}
                  />
                  <Text fontSize="xl" paddingTop={0.5} marginLeft={6}>
                    {starFilled === 0
                      ? "Select your rating"
                      : starFilled === 1
                      ? "Horrible experience"
                      : starFilled === 2
                      ? "Could have been better"
                      : starFilled === 3
                      ? "It was alright"
                      : starFilled === 4
                      ? "Pretty good"
                      : "Great experience"}
                  </Text>
                </Flex>
              </Flex>
              <Box padding={6} paddingTop={4}>
                <Textarea
                  padding={6}
                  value={textValue}
                  onChange={handleInputChange}
                  placeholder="Write review in this text box. Remember to follow our guidelines on how to write a proper review or else yours may be removed."
                  size="lg"
                  minHeight="200px"
                />
              </Box>

              <Box marginLeft={6}>
                <Button type="submit" colorScheme="teal" size="lg">
                  Post your review
                </Button>
              </Box>
            </Box>
          </form>
        )}

        {!session && (
          <Box
            marginTop={4}
            border="1px"
            borderColor="gray.300"
            minHeight="400px"
          >
            <Flex padding={6}>
              <Flex>
                <Star
                  value={1}
                  starFilled={starFilled}
                  handleHoverStar={handleHoverStar}
                />
                <Star
                  value={2}
                  starFilled={starFilled}
                  handleHoverStar={handleHoverStar}
                />
                <Star
                  value={3}
                  starFilled={starFilled}
                  handleHoverStar={handleHoverStar}
                />
                <Star
                  value={4}
                  starFilled={starFilled}
                  handleHoverStar={handleHoverStar}
                />
                <Star
                  value={5}
                  starFilled={starFilled}
                  handleHoverStar={handleHoverStar}
                />

                <Text fontSize="xl" paddingTop={0.5} marginLeft={6}>
                  {starFilled === 0
                    ? "Select your rating"
                    : starFilled === 1
                    ? "Horrible experience"
                    : starFilled === 2
                    ? "Could have been better"
                    : starFilled === 3
                    ? "It was alright"
                    : starFilled === 4
                    ? "Pretty good"
                    : "Great experience"}
                </Text>
              </Flex>
            </Flex>
            <Box padding={6} paddingTop={4}>
              <Textarea
                isDisabled
                padding={6}
                value={textValue}
                onChange={handleInputChange}
                placeholder="In order to write a review and contribute to the community, you must make an account and log in."
                size="lg"
                minHeight="200px"
              />
            </Box>

            <Flex marginLeft={6}>
              <Button colorScheme="teal" size="lg" isDisabled>
                You must login to post
              </Button>
              <Spacer />
              <Link href="/login" passHref>
                <Button colorScheme="gray" size="lg" marginRight={6}>
                  Login
                </Button>
              </Link>
            </Flex>
          </Box>
        )}
      </>
    );
}

export default Reviews;