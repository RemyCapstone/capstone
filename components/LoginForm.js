import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';

import styles from './Form.module.css'

// import { providers, signIn, getSession, csrfToken } from "next-auth/react";

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

  const handleShowPassword = () => setShow(!show);
  const submitHandler = (values) => {
    console.log('i was submitted :D')
    // prevent page refresh
    event.preventDefault();

    const data = props.onLogin(values);
    console.log(data.headers)

    // if (data.invalid === true) {
    //   console.log('User with this email or password does not exist.');
    // }
    // handle submit here
    // On login, go to previous page
    // router.push('/')
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
        onSubmit={(values) => {
          setBtnLoading(true);
          props.onLogin(values).then((data) => {
            // console.log('DATA:', data.invalid);
            if (data.invalid === true) {
              setInvalidCreds(true);
              setBtnLoading(false);
            } else router.push('/');
          });

          // submitHandler(values);
        }}
      >
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
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

            <Button isLoading={btnLoading} isFullWidth mt={4} colorScheme="blue" type="submit">
              Login
            </Button>

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

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context),
    },
  };
}