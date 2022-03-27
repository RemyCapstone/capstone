import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

import styles from './Form.module.css'

import {
  Grid, GridItem,
  Button, Checkbox,
  Heading,
  useToast,
} from '@chakra-ui/react'

import InputField from './InputField';

const LoginForm = () => {

  /* HOOKS */
  const [show, setShow] = useState(false); // hook for show password state
  const toast = useToast();                // Chakra UI toast
  const [btnLoading, setBtnLoading] = useState(false); // hook for button loading state

  const router = useRouter(); // next.js router

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
        onSubmit={async (values) => {
          setBtnLoading(true);

          const res = await signIn("credentials", {
            email: values.userEmail,
            password: values.userPassword,
            redirect: false,
          });

          if (res.error === "CredentialsSignin") {
            // Display error message
            toast({
              title: "Invalid credentials",
              description: "User with this email and/or password does not exist. ",
              status: "error",
              isClosable: true,
              position: "bottom",
              duration: 3000,
            });
            setBtnLoading(false);
          } else {
            router.push("/"); //redirect to home
          }
        }}
      >
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <Heading className={styles.heading}>Login</Heading>

            {/* Input Field for Email */}
            <InputField
              name="userEmail"
              formik={formik}
              type="email"
              label="Email Address"
              touched={formik.touched.userEmail}
              errors={formik.errors.userEmail}
              value={formik.values.userEmail}
            />

            {/* Input Field for Password & Checkbox for Show Password */}
            <InputField
              id="password"
              name="userPassword"
              formik={formik}
              type={show ? "text" : "password"}
              label="Password"
              touched={formik.touched.userPassword}
              errors={formik.errors.userPassword}
              value={formik.values.userPassword}
            />
            <Checkbox size="md" padding={1} onChange={() => setShow(!show)}>
              Show Password
            </Checkbox>

            {/* Button to Login with next-auth Credentials Provider
              - Initiates formik validation and handleSubmit function
             */}
            <Button
              isLoading={btnLoading}
              isFullWidth
              mt={4}
              colorScheme="blue"
              type="submit"
            >
              Login
            </Button>

            {/* Button to Login with next-auth Google Provider and redirects them to Home */}
            <Button
              isFullWidth
              mt={4}
              colorScheme="blue"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login with Google
            </Button>

            {/* Button to change to Signup Form */}
            <Grid justifyContent="flex-end">
              <GridItem>
                <Button
                  variant="ghost"
                  className={styles.otherpage}
                  onClick={() => router.push("/signup")}
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