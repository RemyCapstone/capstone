import SignupForm from "../components/SignupForm";

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

    return <SignupForm onSignup={addUserHandler}></SignupForm>
}

export default SignupPage;