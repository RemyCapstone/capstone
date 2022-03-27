import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';
import styles from './Form.module.css'

import {
    Grid,GridItem,
    Button,
    Heading,
    Checkbox, useToast
} from '@chakra-ui/react'

import InputField from './InputField';

/*
* @returns a form to be used for signing a user up.
*/
const SignupForm = (props) => {
  
  /* HOOKS */
  const [show, setShow] = useState(false); // hook for showing/hiding password
  const [confirmShow, setConfirmShow] = useState(false); // hook for showing/hiding confirm password
  const [btnLoading, setBtnLoading] = useState(false); // hook for button loading state
  const toast = useToast(); // Chakra UI Toast
  const router = useRouter(); // next.js router

  /* Form management via formik,
   * Validation via Yup
   * See here: https://formik.org/docs/tutorial#schema-validation-with-yup
   */
  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validateOnChange={false}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required*"),
          lastName: Yup.string().required("Required*"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required*"),
          password: Yup.string().required("Required*"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match*")
            .required("Required*"),
        })}
        onSubmit={async (values) => {
          setBtnLoading(true);

          const res = await props.onSignup(values); // call api and wait for response

          if (res !== "") {
            toast({
              title: "A user with this email already exists.",
              status: "error",
              isClosable: true,
              position: "bottom",
              duration: 3000,
            });
          } else {
            // Else, account creation was a success. Redirect to login and initiate next-auth signin. Use Chakra UI toast to show success message.
            router.push('/login')
            toast({
              title: "Account Creation Success",
              description: "Please login using your new credentials.",
              status: "success",
              isClosable: true,
            });

          }
          setBtnLoading(false);
        }}
      >
        {(formik) => (
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <Heading className={styles.heading}>Sign Up</Heading>
            <InputField
              name="firstName"
              formik={formik}
              type="text"
              label="First Name"
              touched={formik.touched.firstName}
              errors={formik.errors.firstName}
              value={formik.values.firstName}
            />

            <InputField
              name="lastName"
              formik={formik}
              type="text"
              label="Last Name"
              touched={formik.touched.lastName}
              errors={formik.errors.lastName}
              value={formik.values.lastName}
            />

            <InputField
              name="email"
              formik={formik}
              type="email"
              label="Email Address"
              touched={formik.touched.email}
              errors={formik.errors.email}
              value={formik.values.email}
            />

            <InputField
              name="password"
              formik={formik}
              type={show ? "text" : "password"}
              label="Password"
              touched={formik.touched.password}
              errors={formik.errors.password}
              value={formik.values.password}
            />

            <Checkbox
              size="md"
              padding={1}
              paddingBottom="0.65rem"
              onChange={() => setShow(!show)}
            >
              Show Password
            </Checkbox>

            <InputField
              name="confirmPassword"
              formik={formik}
              type={confirmShow ? "text" : "password"}
              label="Confirm Password"
              touched={formik.touched.confirmPassword}
              errors={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
            />
            <Checkbox
              size="md"
              padding={1}
              onChange={() => setConfirmShow(!confirmShow)}
            >
              Show Password
            </Checkbox>

            <Button
              isLoading={btnLoading}
              isFullWidth
              mt={4}
              colorScheme="blue"
              type="submit"
              className={styles.actionbutton}
            >
              Sign Up
            </Button>

            <Grid justifyContent="flex-end">
              <GridItem>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className={styles.otherpage}
                >
                  Already have an account? Sign In
                </Button>
              </GridItem>
            </Grid>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SignupForm;