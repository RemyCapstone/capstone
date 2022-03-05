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
        console.log(data);
    }

    return <SignupForm onSignup={addUserHandler}></SignupForm>
}

export default SignupPage;