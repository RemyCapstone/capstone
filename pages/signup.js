import { useState } from 'react';
import { useRouter } from 'next/router';
import SignupForm from "../components/SignupForm";

function SignupPage() {
    const [signupError, setSignupError] = useState("");
    let router = useRouter();

    // const redirectOnSuccess = () => {
    //     console.log("redirect");
    //     router.push('/');
    // }

    async function addUserHandler(enteredUserData) {
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
            return data.message;
        }
        else if (data.status === 201)
        {
            return "";
        }
    }

    return <SignupForm onSignup={addUserHandler} signupError={signupError}></SignupForm>
}

export default SignupPage;