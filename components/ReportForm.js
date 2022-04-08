import {
    useToast, useDisclosure,
    Button, ButtonGroup,
    FormControl, FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading, Text,
    Textarea,
    Input, InputGroup, InputLeftElement,
    Select, Divider,
    // Radio, RadioGroup,
    Stack
} from '@chakra-ui/react';
import {PhoneIcon} from '@chakra-ui/icons';
import { MdReportProblem } from 'react-icons/md';
import { useState } from 'react';


const ReportForm = ({zpid, address, purpose }) => {
    // Hooks go here
    // --- Interactive hooks
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // --- Hooks to grab data from form
    const [problem, setProblem] = useState("");
    const handleSetProblem = (e) => setProblem(e.target.value);
    const resetModal = () => {
        setProblem("");
        onClose();
    }

    // const [problemDetail, setProblemDetail] = useState("");
    // const handleSetProblemDetail = (e) => setProblemDetail(e.target.value);


    // Data options go here
    // --- Problem
    const problemsDropdownOptions = ["Appliance",
    "Door/Window",
    "Electric",
    "Flooring/Stairs",
    "General",
    "Heat/Hot Water",
    "Paint/Plaster",
    "Plumbing",
    "Safety",
    "Unsanitary Condition",
    "Water Leak"];

    // -- Location (all)
    const locationDropdownOptions = ["Bathroom",
    "Bedroom",
    "Entire Apartment",
    "Entrance/Foyer",
    "Kitchen",
    "Living Room",
    "Other room/area",
    "Private Hall"];

    // --- Problem detail (11 total different possibilities)
    const applianceProblemDetailOptions = ["Electric/ Gas Range",
    "Refrigerator"];

    const doorWindowProblemDetailOptions = ["Door",
    "Door Frame",
    "Door to Dumbwaiter",
    "Window Frame",
    "Window Pane"];

    const electricProblemDetailOptions = ["Lighting",
    "No Lighting",
    "Outlet/ Switch",
    "Power Outage",
    "Wiring"];

    const floorStairsProblemDetailOptions = ["Floor",
    "Stairs"];

    const generalProblemDetailOptions = ["Bell/Buzzer/Intercom",
    "Cabinet",
    "Cooking Gas",
    "Ventilation System"]

    const heatHotWaterProblemDetailOptions = ["Apartment Only",
    "Entire Building"];

    const paintPlasterProblemDetailOptions = ["Cabinet",
    "Ceiling",
    "Door/ Frame",
    "Radiator",
    "Wall",
    "Window/Frame"];

    const plumbingProblemDetailOptions = ["Basin/Sink",
    "Bathtub/ Shower",
    "Radiator",
    "Steam Pipe/ Riser",
    "Toilet",
    "Water Supply"];

    const safetyProblemDetailOptions = ["Carbon Monoxide Detector",
    "Fire Escape",
    "Smoke Detector",
    "Sprinkler",
    "Window Guard Broken/Missing"];

    const unsanitaryProblemDetailOptions = ["Mold",
    "Pests",
    "Sewage"];

    const waterLeakProblemDetailOptions = ["Damp Spot",
    "Heavy Flow",
    "Slow Leak"];

    const problemDetailDropdownOptionsMap = {
        "Appliance": applianceProblemDetailOptions,
        "Door/Window": doorWindowProblemDetailOptions,
        "Electric": electricProblemDetailOptions,
        "Flooring/Stairs": floorStairsProblemDetailOptions,
        "General": generalProblemDetailOptions,
        "Heat/Hot Water": heatHotWaterProblemDetailOptions,
        "Paint/Plaster": paintPlasterProblemDetailOptions,
        "Plumbing": plumbingProblemDetailOptions,
        "Safety": safetyProblemDetailOptions,
        "Unsanitary Condition": unsanitaryProblemDetailOptions,
        "Water Leak": waterLeakProblemDetailOptions
    }
    // Helper functions go here
    /*
    * formAddress takes in the [zpid] address prop and forms a human readable address to send to the API.
    */
    const formAddress = (address) => {
        return `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`;
    }

    /*
    * sendEmail closes the modal and grabs the relevant information from the form.
    * It will hit our API endpoint to report a violation.
    * and show the status in a toast depending on the response status.
    */
    async function sendEmail() {
        // Prevent page refresh
        event.preventDefault();

        // Close modal
        setProblem(""); // Reset problem
        onClose();

        // Grab user's entered data
        const problemDetail = document.getElementById('problemDetail').value;
        const locationDetail = document.getElementById('problemLocation').value;
        const additionalDetails = document.getElementById('additionalDetailsText').value;

        const tenantFirstName = document.getElementById('tenantFirstName').value;
        const tenantLastName = document.getElementById('tenantLastName').value;
        const tenantEmail = document.getElementById('tenantEmail').value;
        const tenantPrimaryPhone = document.getElementById('tenantPrimaryPhone').value;
        const tenantPhone = document.getElementById('tenantPhone').value;

        const ownerFirstName = document.getElementById('ownerFirstName').value;
        const ownerLastName = document.getElementById('ownerLastName').value;
        const ownerPhone = document.getElementById('ownerPhone').value;

        const childLive = document.getElementById('childLive').value;
        const childVisit = document.getElementById('childVisit').value;

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
                dateReported: new Date().toString(),
                // Form data
                problem: problem,
                problemDetail: problemDetail,
                locationDetail: locationDetail,
                additionalDetails: additionalDetails ? additionalDetails : 'The user did not provide more information.', // optional
                tenantFirstName: tenantFirstName,
                tenantLastName: tenantLastName,
                tenantEmail: tenantEmail ? tenantEmail : 'The user did not provide a tenant email.', // optional
                tenantPrimaryPhone: tenantPrimaryPhone,
                tenantPhone: tenantPhone,
                ownerFirstName: ownerFirstName ? ownerFirstName : "The user did not provider the building owner's first name.",
                ownerLastName: ownerLastName ? ownerLastName : "The user did not provider the building owner's last name.",
                ownerPhone: ownerPhone ? ownerPhone : "The user did not provide the building owner's phone.",
                childLive: childLive,
                childVisit: childVisit
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
            {/* Button to open modal */}
            <Button
                leftIcon={<MdReportProblem/>}
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
            <Modal isOpen={isOpen} onClose={resetModal} size='xl' scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Report a Violation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Preliminary */}
                    <Text color='gray.400' mb='5'><i>Fill out the following form and Remy will
                        help get your report of a violation to the HPD.</i></Text>
                    {/* Step 1: Building Address */}
                    <Heading size='md'>Step 1: Listing</Heading>
                    <Text>{formAddress(address)}</Text>
                    <br/>
                    <Divider />
                    {/* Step 2: Problem and Problem Detail */}
                    <Heading size='md' marginTop='20px' paddingBottom='5px'>Step 2: Problem</Heading>
                    <FormControl isRequired>
                        <FormLabel>Problem</FormLabel>
                        <Select placeholder="Select a problem" id='problem' mb='8px' isRequired onChange={handleSetProblem}>
                            {problemsDropdownOptions.map(problem => (
                                <option key={problem} value={problem}>{problem}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl isRequired>
                        <FormLabel>Problem Detail</FormLabel>
                        {
                            problem !== ""
                            ?
                            <Select id='problemDetail' mb='8px' isRequired>
                                {
                                    problemDetailDropdownOptionsMap[problem].map(problemDetailOption =>
                                        <option key={problemDetailOption} value={problemDetailOption}>{problemDetailOption}</option>
                                    )
                                }
                            </Select>
                            :
                            <Select id='problemDetail' mb='8px' disabled>
                                <option>Select a problem first</option>
                            </Select>
                        }
                    </FormControl>

                    {/* Step 3: Location Details */}
                    <br/>
                    <Divider />
                    <Heading size='md' mt='20px' mb='8px'>Step 3: Location Details</Heading>
                    <FormControl isRequired>
                        <FormLabel>Location of Problem</FormLabel>
                        <Select id='problemLocation' mb='8px' isRequired>
                            {locationDropdownOptions.map(location => (
                                <option value={location} key={location}>{location}</option>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Additional Notes */}
                    <Heading size='md' marginTop='20px' paddingBottom='5px'>Additional notes</Heading>
                    <Textarea id='additionalDetailsText' marginBottom='30px' placeholder='Enter more helpful notes here for this report'></Textarea>
                    {/* Step 4: User Info */}
                    <Divider />
                    <Heading size='md' marginTop='20px' paddingBottom='5px'>Step 3: Your information</Heading>
                    <FormControl isRequired>
                        <FormLabel>Tenant First Name</FormLabel>
                        <Input
                            placeholder='First name'
                            size='md'
                            isRequired
                            id='tenantFirstName'
                            mb='8px'
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Tenant Last Name</FormLabel>
                        <Input
                            placeholder='Last name'
                            size='md'
                            isRequired
                            id='tenantLastName'
                            display='inline-block'
                            mb='8px'
                        />
                    </FormControl>
                    <Text>Tenant Email</Text>
                    <Input
                        placeholder='Email'
                        size='md'
                        isRequired
                        id='tenantEmail'
                        mb='8px'
                    />
                    <FormControl isRequired>
                        <FormLabel>Primary Phone</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<PhoneIcon color='gray.300' />}
                            />
                            <Input
                                type='tel'
                                placeholder='Phone number'
                                size='md'
                                id='tenantPrimaryPhone'
                                mb='8px'
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Tenant Phone</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<PhoneIcon color='gray.300' />}
                            />
                            <Input
                                type='tel'
                                placeholder='Phone number'
                                size='md'
                                id='tenantPhone'
                                mb='8px'
                            />
                        </InputGroup>
                    </FormControl>
                    <Divider my='10px'/>
                    <Text>Building Owner First Name</Text>
                    <Input
                        placeholder='First name'
                        size='md'
                        isRequired
                        id='ownerFirstName'
                        mb='8px'
                    />
                    <Text>Building Owner Last Name</Text>
                    <Input
                        placeholder='Last name'
                        size='md'
                        isRequired
                        id='ownerLastName'
                        mb='8px'
                    />
                    <Text>Building Owner Phone</Text>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<PhoneIcon color='gray.300' />}
                        />
                        <Input
                            type='tel'
                            placeholder='Phone number'
                            size='md'
                            id='ownerPhone'
                            mb='8px'
                        />
                    </InputGroup>
                    <FormControl isRequired>
                        <FormLabel>Does a child under six live here?</FormLabel>
                        <Select id='childLive' mb='8px' isRequired>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Does a child under six regularly visit here for more than 10 hours a week?</FormLabel>
                        <Select id='childVisit' mb='8px' isRequired>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </Select>
                    </FormControl>
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