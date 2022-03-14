import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  // Handle Login
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