import { useState } from 'react';
import { useRouter } from 'next/router';
import SignupForm from "../components/SignupForm";

function SignupPage() {
    const [signupError, setSignupError] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    let router = useRouter();

    const redirectOnSuccess = () => {
        console.log("redirect");
        router.push('/');
    }

    async function addUserHandler(enteredUserData) {
        setBtnLoading(true);
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(enteredUserData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status === 401)
        {
            setSignupError(data.message);
            setBtnLoading(false);
        }
        else if (data.status === 201)
        {
            setSignupError("");
            redirectOnSuccess();
        }
        else {
            setSignupError("There was an error signing up.");
            setBtnLoading(false);
        }
    }

    return <SignupForm
                onSignup={addUserHandler}
                signupError={signupError}
                btnLoading={btnLoading}>
            </SignupForm>
}

export default SignupPage;