import LoginForm from "../components/LoginForm";

import { getProviders, signIn } from "next-auth/react";

const LoginPage = (props) => {
  // Providers
  const m_providers = props.providers;

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

  return <LoginForm onLogin={findUserHandler} providers={m_providers}></LoginForm>
}

export default LoginPage;

export async function getServerSideProps(context) {
  console.log("get server side props");
  return { props: { providers: await getProviders() } };
}