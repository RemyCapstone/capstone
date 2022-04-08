import {
    useToast, useDisclosure,
    Button, ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading, Text,
    Textarea, Input
} from '@chakra-ui/react';
import { MdReportProblem } from 'react-icons/md';


const ReportForm = ({zpid, address, purpose, userEmail}) => {
    // Hooks go here
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Helper functions go here
    const formAddress = (address) => {
        return `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`;
    }

    async function sendEmail() {
        // Prevent page refresh
        event.preventDefault();

        // Close modal
        onClose();

        // Grab user's entered data
        const additionalDetails = document.getElementById('additionalDetailsText').value;

        // Send the email by hitting our API endpoint
        console.log("Sending email");
        const response = await fetch('/api/reportViolation', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zpid: zpid,
                address: formAddress(address),
                purpose: purpose,
                userEmail: userEmail,
                additionalDetails: additionalDetails ? additionalDetails : 'The user did not provide more information.'
            })
        });
        const json = await response.json();

        if (response.status === 200)
        {
            toast({
                title: json.message,
                status: "success",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        } else
        {
            toast({
                title: json.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 2000,
            });
        }
    }

    return (
        <div>
            <Button
                leftIcon={<MdReportProblem/>} c
                color='gray.400'
                variant='link'
                fontSize='16px'
                float='right'
                marginTop={10}
                padding='5px'
                onClick={onOpen}
            >
                Report a violation
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Report a Violation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Heading size='md'>Listing</Heading>
                    <Text>{formAddress(address)}</Text>
                    <br/>
                    <Heading size='md' paddingBottom='5px'>Additional notes</Heading>
                    <Textarea id='additionalDetailsText' placeholder='Enter more helpful notes here for this report'></Textarea>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' onClick={sendEmail} type='submit'>Submit Report</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ReportForm;