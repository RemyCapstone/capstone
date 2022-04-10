// Chakra UI
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

// React
import { useState, Fragment } from 'react';
import FormErrorMessage from './FormErrorMessage';

// Form Validation
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// CSS fixes
import styles from './Form.module.css'

const ReportForm = ({zpid, address, purpose }) => {
    // Hooks go here
    // --- Interactive hooks
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // --- Hooks to grab data from form
    const [problem, setProblem] = useState("");
    const handleSetProblem = (e) => setProblem(e.target.value);

    const [problemDetail, setProblemDetail] = useState("");
    const handleSetProblemDetail = (newValue) => setProblemDetail(newValue);

    const resetModal = () => {
        setProblem("");
        setProblemDetail("");
        onClose();
    }

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
        console.log('problemDetail', problemDetail)
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
                additionalDetails: additionalDetails.trim() ? additionalDetails : 'The user did not provide more information.', // optional
                tenantFirstName: tenantFirstName.trim(),
                tenantLastName: tenantLastName.trim(),
                tenantEmail: tenantEmail.trim() ? tenantEmail : 'The user did not provide a tenant email.', // optional
                tenantPrimaryPhone: tenantPrimaryPhone.trim(),
                tenantPhone: tenantPhone.trim(),
                ownerFirstName: ownerFirstName.trim() ? ownerFirstName : "The user did not provider the building owner's first name.",
                ownerLastName: ownerLastName.trim() ? ownerLastName : "The user did not provider the building owner's last name.",
                ownerPhone: ownerPhone.trim() ? ownerPhone : "The user did not provide the building owner's phone.",
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
        <Fragment>
            <Formik
                initialValues={{
                    problem: "",
                    problemDetail: "",
                    problemLocation: "Bathroom",
                    tenantFirstName: "",
                    tenantLastName: "",
                    tenantPrimaryPhone: "",
                    tenantPhone: "",
                    childLive:"No",
                    childVisit:"No",
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                    problem: Yup.string().required('Required'),
                    problemDetail: Yup.string().required('Required'),
                    problemLocation: Yup.string().required('Required'),
                    tenantFirstName: Yup.string().trim().required('Required'),
                    tenantLastName: Yup.string().trim().required('Required'),
                    tenantPrimaryPhone: Yup.string().trim().required('Required'),
                    tenantPhone: Yup.string().trim().required('Required'),
                    childLive: Yup.string().required('Required'),
                    childVisit: Yup.string().required('Required')
                })}
                onSubmit={(e, {resetForm, initialValues}) => {
                    resetForm(initialValues);
                    sendEmail();
                }}
            >
            {({errors, touched, handleSubmit, handleChange, handleBlur, resetForm, setFieldValue}) => (<div>
                {/* Button to open modal */}
                <Button
                    leftIcon={<MdReportProblem/>}
                    color='gray.400'
                    variant='link'
                    fontSize='16px'
                    float='right'
                    marginTop={10}
                    padding='5px'
                    onClick={ () => {onOpen(); resetForm();}}
                >
                    Report a violation
                </Button>
                <Modal isOpen={isOpen} onClose={e => {resetForm(); resetModal();}} size='xl' scrollBehavior='inside'>
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
                        <FormControl isRequired isInvalid={touched.problem && errors.problem}>
                            <FormLabel mb={0}>Problem</FormLabel>
                            <Select
                                placeholder="Select a problem"
                                id='problem'
                                name='problem'
                                mb='8px'
                                isRequired
                                onChange={e => {
                                    handleChange(e); // formik built-in handler
                                    handleSetProblem(e); // my handler
                                    if(e.target.value) {
                                        setFieldValue('problemDetail', problemDetailDropdownOptionsMap[e.target.value][0]);
                                        handleSetProblemDetail(problemDetailDropdownOptionsMap[e.target.value][0]);
                                    }
                                    else {
                                        setFieldValue('problemDetail', '');
                                        handleSetProblemDetail('');
                                    }
                                }}
                                onBlur={handleBlur}
                            >
                                {problemsDropdownOptions.map(problem => (
                                    <option key={problem} value={problem}>{problem}</option>
                                ))}
                            </Select>
                            <FormErrorMessage touched={touched.problem} errors={errors.problem} />
                        </FormControl>
                        <br/>
                        <FormControl isRequired isInvalid={touched.problemDetail && errors.problemDetail}>
                            <FormLabel mb={0}>Problem Detail</FormLabel>
                            {
                                problem !== ""
                                ?
                                <Fragment>
                                    <Select
                                        id='problemDetail'
                                        name='problemDetail'
                                        mb='8px'
                                        isRequired
                                        onChange={e => {handleChange(e); handleSetProblemDetail(e.target.value);}}
                                        onBlur={handleBlur}
                                    >
                                        {
                                            problemDetailDropdownOptionsMap[problem].map(problemDetailOption =>
                                                <option key={problemDetailOption} value={problemDetailOption}>{problemDetailOption}</option>
                                            )
                                        }
                                    </Select>
                                    <FormErrorMessage touched={touched.problemDetail} errors={errors.problemDetail} />
                                </Fragment>
                                :
                                <Fragment>
                                    <Select id='problemDetailUnselected' mb='8px' disabled>
                                        <option>Select a problem first</option>
                                    </Select>
                                    <FormErrorMessage touched={touched.problemDetail} errors={errors.problemDetail} />
                                </Fragment>
                            }
                        </FormControl>

                        {/* Step 3: Location Details */}
                        <br/>
                        <Divider />
                        <Heading size='md' mt='20px' mb='8px'>Step 3: Location Details</Heading>
                        <FormControl isRequired isInvalid={touched.problemLocation && errors.problemLocation}>
                            <FormLabel mb={0}>Location of Problem</FormLabel>
                            <Select
                                id='problemLocation'
                                name='problemLocation'
                                mb='8px'
                                isRequired
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {locationDropdownOptions.map(location => (
                                    <option value={location} key={location}>{location}</option>
                                ))}
                            </Select>
                            <FormErrorMessage touched={touched.problemLocation} errors={errors.problemLocation} />
                        </FormControl>
                        {/* Additional Notes */}
                        <Heading size='md' marginTop='20px' paddingBottom='5px'>Additional notes</Heading>
                        <Textarea id='additionalDetailsText' marginBottom='30px' placeholder='Enter more helpful notes here for this report'></Textarea>
                        {/* Step 4: User Info */}
                        <Divider />
                        <Heading size='md' marginTop='20px' paddingBottom='5px'>Step 3: Your information</Heading>
                        <FormControl isRequired isInvalid={touched.tenantFirstName && errors.tenantFirstName}>
                            <FormLabel mb={0}>Tenant First Name</FormLabel>
                            <Input
                                placeholder='First name'
                                size='md'
                                isRequired
                                id='tenantFirstName'
                                name='tenantFirstName'
                                mb='8px'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage touched={touched.tenantFirstName} errors={errors.tenantFirstName} />
                        </FormControl>
                        <FormControl isRequired isInvalid={touched.tenantLastName && errors.tenantLastName}>
                            <FormLabel mb={0}>Tenant Last Name</FormLabel>
                            <Input
                                placeholder='Last name'
                                name='tenantLastName'
                                size='md'
                                isRequired
                                id='tenantLastName'
                                display='inline-block'
                                mb='8px'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage touched={touched.tenantLastName} errors={errors.tenantLastName} />
                        </FormControl>
                        <Text>Tenant Email</Text>
                        <Input
                            placeholder='Email'
                            size='md'
                            isRequired
                            id='tenantEmail'
                            mb='8px'
                        />
                        <FormControl isRequired isInvalid={touched.tenantPrimaryPhone && errors.tenantPrimaryPhone}>
                            <FormLabel mb={0}>Primary Phone</FormLabel>
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
                                    name='tenantPrimaryPhone'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            <FormErrorMessage touched={touched.tenantPrimaryPhone} errors={errors.tenantPrimaryPhone} />
                        </FormControl>
                        <FormControl isRequired isInvalid={touched.tenantPhone && errors.tenantPhone}>
                            <FormLabel mb={0}>Tenant Phone</FormLabel>
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
                                    name='tenantPhone'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </InputGroup>
                            <FormErrorMessage touched={touched.tenantPhone} errors={errors.tenantPhone} />
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
                        <FormControl isRequired isInvalid={touched.childLive && errors.childLive}>
                            <FormLabel mb={0}>Does a child under six live here?</FormLabel>
                            <Select
                                id='childLive'
                                mb='8px'
                                isRequired
                                name='childLive'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </Select>
                            <FormErrorMessage touched={touched.childLive} errors={errors.childLive} />
                        </FormControl>
                        <FormControl isRequired isInvalid={touched.childVisit && errors.childVisit}>
                            <FormLabel mb={0}>Does a child under six regularly visit here for more than 10 hours a week?</FormLabel>
                            <Select id='childVisit' mb='8px' isRequired>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </Select>
                            <FormErrorMessage touched={touched.childVisit} errors={errors.childVisit} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={e => {resetForm(); resetModal();}}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={e => {handleSubmit(e);}}type='submit'>Submit Report</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
            )}
            </Formik>
        </Fragment>
    );
}

export default ReportForm;