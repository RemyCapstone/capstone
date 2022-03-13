import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  // Handle Login
  const findUserHandler = async(enteredUserData) => {
    console.log('this is the user data: ',  enteredUserData);

    const response = await fetch('/api/login', {
      method: 'POST', 
      body: JSON.stringify(enteredUserData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('data was taken: ', data);
  }
  
  return <LoginForm onLogin={findUserHandler} />
}

export default LoginPage;