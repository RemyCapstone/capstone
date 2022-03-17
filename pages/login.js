import LoginForm from "../components/LoginForm";


const LoginPage = () => {
  // findUserHandler: call /api/login using entered data and validate
  const findUserHandler = async(enteredUserData) => {

    const response = await fetch('/api/login', {
      method: 'POST', 
      body: JSON.stringify(enteredUserData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    return data
  }

  return <LoginForm onLogin={findUserHandler} />
}

export default LoginPage;