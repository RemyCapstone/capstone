import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';


import styles from './Form.module.css'


import {
    Grid,GridItem,
    Button,
    Text, Heading
} from '@chakra-ui/react'

import InputField from './InputField';

const LoginForm = (props) => {
  const [show, setShow] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const {data: session, status} = useSession();

  const handleShowPassword = () => setShow(!show);
  
  if (status === "authenticated") {
    console.log("AUTHENTICATED");
    console.log(session);
  } else {
    console.log("NOT AUTHENTICATED");
  }

  const googleAuth = () => {
    signIn("google", {callbackUrl: '/'});
  }

  const goToSignup = () => {
    router.push("/signup");
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          userEmail: "",
          userPassword: "",
        }}
        validateOnChange={false}
        validationSchema={Yup.object({
          userEmail: Yup.string()
            .email("Invalid email address")
            .required("Required*"),
          userPassword: Yup.string().required("Required*"),
        })}
        onSubmit = {async (values) => {
          setBtnLoading(true);

          const res = await signIn("credentials", {
            email: values.userEmail,
            password: values.userPassword,
            redirect: false,
            // callbackUrl: "/login",
          });

          if (res.error === "CredentialsSignin") {
            setInvalidCreds(true);
          } else {
            console.log('sign in went thru!')
          }

          setBtnLoading(false);
          // if (status === "authenticated") {
          //   console.log("AUTHENTICATED");
          //   console.log(session.user.email);
          // } else {
          //   console.log("NOT AUTHENTICATED");
          // }
        }}
      >
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            {/* <Heading>{session ? session.user.firstName : "not logged in"}</Heading> */}

            <Heading className={styles.heading}>Login</Heading>
            {invalidCreds ? (
              <Text fontSize="md" color="red">
                User with this email and/or password does not exist.
              </Text>
            ) : null}
            <InputField
              name="userEmail"
              formik={formik}
              type="email"
              placeholder="Email"
              label="Email Address"
              touched={formik.touched.userEmail}
              errors={formik.errors.userEmail}
              value={formik.values.userEmail}
            />

            <InputField
              name="userPassword"
              formik={formik}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              label="Password"
              touched={formik.touched.userPassword}
              errors={formik.errors.userPassword}
              value={formik.values.userPassword}
              onClick={handleShowPassword}
              visible={show}
            />

            <Button
              isLoading={btnLoading}
              isFullWidth
              mt={4}
              colorScheme="blue"
              type="submit"
            >
              Login
            </Button>

            <Button isFullWidth mt={4} colorScheme="blue" onClick={googleAuth}>
              Login with Google
            </Button>
            <Button onClick={signOut}>Sign Out</Button>

            <Grid justifyContent="flex-end">
              <GridItem>
                <Button
                  variant="ghost"
                  className={styles.otherpage}
                  onClick={goToSignup}
                >
                  Don't have an account? Sign Up
                </Button>
              </GridItem>
            </Grid>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default LoginForm;

