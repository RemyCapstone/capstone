import SignupForm from "../components/SignupForm";
import { useSession } from "next-auth/react";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn";

function SignupPage() {
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
        else return ""; //no error message to return
    }

    const { data: session, status } = useSession(); // session state
    if (session) return <AlreadyLoggedIn />;
    
    if (status === "loading") {
        return <div></div>
    }
    
    return <SignupForm onSignup={addUserHandler}></SignupForm>;

}

export default SignupPage;