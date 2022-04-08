import {
    useToast,
    Button, ButtonGroup
} from '@chakra-ui/react';
import { MdReportProblem } from 'react-icons/md';


const ReportForm = ({zpid, address, purpose, userEmail}) => {
    // Hooks go here
    const toast = useToast();

    // Helper functions go here
    async function sendEmail() {
        event.preventDefault();

        console.log("Sending email");
        const response = await fetch('/api/reportViolation', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zpid: zpid,
                address: address,
                purpose: purpose,
                userEmail: userEmail
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
        <form onSubmit={sendEmail}>
            <Button
                leftIcon={<MdReportProblem/>} c
                color='gray.400'
                variant='link'
                fontSize='16px'
                float='right'
                marginTop={10}
                type="submit"
            >
                Report a violation
            </Button>
        </form>
    );
}

export default ReportForm;