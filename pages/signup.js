import { useState } from 'react';
import SignupForm from "../components/SignupForm";

function SignupPage() {
    const [signupError, setSignupError] = useState("");
    async function addUserHandler(enteredUserData) {
        console.log(enteredUserData);

        try {
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
                // alert(data.message);
                setSignupError(data.message);
            }
        }
        catch
        {
            console.log("error")
            alert("Error with internal API");
        }
    }

    return <SignupForm onSignup={addUserHandler} signupError={signupError}></SignupForm>
}

export default SignupPage;