/*
* @returns a form to be used for signing a user up.
*/

const SignupForm = (props) => {
    function submitHandler(event) {
        event.preventDefault();

        // Placeholder for actual form data and validation
        const userData = {
            firstname: 'Jenny',
            lastname: 'Smith',
            email: 'jennysmith@gmail.com',
            password: 'password123'
        }

        props.onSignup(userData);
    }


    return (
        <div>
            <form onSubmit={submitHandler}>
                <button>Signup</button>
            </form>
        </div>
    );
}

export default SignupForm;