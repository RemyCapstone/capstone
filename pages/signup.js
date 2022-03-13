import SignupForm from "../components/SignupForm";

function SignupPage() {
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
            if (data.message === 401)
            {
                alert("Email already exists.");
            }
        }
        catch
        {
            console.log("error")
            alert("Error with internal API");
        }
    }

    return <SignupForm onSignup={addUserHandler}></SignupForm>
}

export default SignupPage;