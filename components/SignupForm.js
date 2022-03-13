import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './SignupForm.module.css'

import {
    Grid,
    GridItem,
    Button,
} from '@chakra-ui/react'

import InputField from './InputField';

/*
* @returns a form to be used for signing a user up.
*/
const SignupForm = (props) => {
    const [show, setShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false);

    /*  Show/hide Password */
    const handleShowPassword = () => setShow(!show)
    const handleShowConfirmPassword = () => setConfirmShow(!confirmShow)
    /* What happens on submit */
    function submitHandler(values) {
        // Prevent page refresh
        event.preventDefault();

        props.onSignup(values);
    }

    return (
        <Fragment>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={(Yup.object({
                firstName: Yup.string()
                  .required('Required*'),
                lastName: Yup.string()
                  .required('Required*'),
                email: Yup.string().email('Invalid email address').required('Required*'),
                password: Yup.string()
                  .required('Required*'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match*')
            }))}
            onSubmit={values => {
                submitHandler(values);
            }}
        >
        {( formik ) => (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <InputField
                name='firstName'
                formik={formik}
                type='text'
                placeholder='First Name'
                label='First Name'
                touched={formik.touched.firstName}
                errors={formik.errors.firstName}
                value={formik.values.firstName}
            />

            <InputField
                name='lastName'
                formik={formik}
                type='text'
                placeholder='Last Name'
                label='Last Name'
                touched={formik.touched.lastName}
                errors={formik.errors.lastName}
                value={formik.values.lastName}
            />

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

            <InputField
                name='confirmPassword'
                formik={formik}
                type={confirmShow ? 'text':'password'}
                placeholder='Confirm password'
                label='Confirm Password'
                touched={formik.touched.confirmPassword}
                errors={formik.errors.confirmPassword}
                value={formik.values.confirmPassword}
                onClick={handleShowConfirmPassword}
                visible={confirmShow}
            />

            <Button
                isFullWidth
                mt={4}
                colorScheme='pink'
                type='submit'
            >
                Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
                <GridItem>
                    {/* TODO: Link to Sign In Page */}
                    <Button variant="ghost">
                        Already have an account?  Sign In
                    </Button>
                </GridItem>
            </Grid>



        </form>
        )}
        </Formik>
        </Fragment>
    );
}

export default SignupForm;