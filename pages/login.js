import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage;

export async function getServerSideProps(context) {
  console.log("get server side props");
  return { props: { providers: await getProviders() } };
}