import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';

import styles from './Form.module.css'

import {
    Grid,
    GridItem,
    Button,
} from '@chakra-ui/react'

import InputField from './InputField';

const LoginForm = (props) => {
  const [show, setShow] = useState(false);
  
  const router = useRouter();

  const handleShowPassword = () => setShow(!show);

  function submitHandler(values) {
    // prevent page refresh
    event.preventDefault();

    const data = props.onLogin(values);
    // handle submit here
    // On login, go to previous page
    // router.push('/')
  }
  const signIn = () => {
    router.push('/signup')
  }
  return (
    <Fragment>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={(Yup.object({
          email: Yup.string().email('Invalid email address').required('Required*'),
          password: Yup.string().required('Required*')
        }))}
        onSubmit={values => {
          submitHandler(values);
        }}
      >
      {( formik ) => (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <InputField 
            name='email'
            formik={formik}
            type='email'
            placeholder='Email'
            label='Email Address'
            touched={formik.touched.email}
            errors={formik.errors.email}
            value={formik.values.email}
          />

          <InputField 
            name='password'
            formik={formik}
            type={show ? 'text':'password'}
            placeholder='Enter password'
            label='Password'
            touched={formik.touched.password} 
            errors={formik.errors.password} 
            value={formik.values.password} 
            onClick={handleShowPassword}
            visible={show}
          />

          <Button
            isFullWidth
            mt={4}
            colorScheme='pink'
            type='submit'
          >
            Login
          </Button>

          
          <Grid justifyContent="flex-end">
              <GridItem>
                  {/* TODO: Link to Sign In Page */}
                  <Button variant="ghost" onClick={signIn}>
                      Don't have an account? Sign Up
                  </Button>
              </GridItem>
          </Grid>
        </form>
      )}
      </Formik>
    </Fragment>
  )
};

export default LoginForm;