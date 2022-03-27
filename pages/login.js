import LoginForm from "../components/LoginForm";
import { useSession } from "next-auth/react";

import AlreadyLoggedIn from '../components/AlreadyLoggedIn';

const LoginPage = () => {
  // Check if user is already logged in and show error if so.
  const { data: session, status } = useSession(); // session state
  if (session) return <AlreadyLoggedIn />;

  if (status === "loading") {
    return <div></div>;
  }
  return <LoginForm />;
};

export default LoginPage;