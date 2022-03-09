import { Fragment } from 'react';
import { useFormik, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';

import styles from './SignupForm.module.css'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/react'

/*
* @returns a form to be used for signing a user up.
*/
const SignupForm = (props) => {
    /* What happens on submit */
    function submitHandler(values) {
        // Prevent page refresh
        event.preventDefault();

        props.onSignup(values);
    }

    /* Form management via formik,
    * Validation via Yup
    * See here: https://formik.org/docs/tutorial#schema-validation-with-yup
    */
    // const formik = useFormik({
    //     initialValues: {
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //       password: ''
    //     },
    //     validationSchema: Yup.object({
    //       firstName: Yup.string()
    //         .required('Required*'),
    //       lastName: Yup.string()
    //         .required('Required*'),
    //       email: Yup.string().email('Invalid email address').required('Required'),
    //       password: Yup.string()
    //         .required('Required*')
    //     }),
    //     onSubmit: values => {
    //       submitHandler(values);
    //     },
    // });

    // initialValues: {
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: ''
    //   },
    //   validationSchema: Yup.object({
    //     firstName: Yup.string()
    //       .required('Required*'),
    //     lastName: Yup.string()
    //       .required('Required*'),
    //     email: Yup.string().email('Invalid email address').required('Required'),
    //     password: Yup.string()
    //       .required('Required*')
    //   }),
    //   onSubmit: values => {
    //     submitHandler(values);
    //   },

    return (
        <Fragment>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }}
            validationSchema={(Yup.object({
                firstName: Yup.string()
                  .required('Required*'),
                lastName: Yup.string()
                  .required('Required*'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                  .required('Required*')
            }))}
            onSubmit={values => {
                submitHandler(values);
            }}
        >
        {( formik, errors, touched ) => (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={false}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className={styles.input}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className={styles.errors}>{formik.errors.firstName}</div>
                ) : null}

                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className={styles.errors}>{formik.errors.lastName}</div>
                ) : null}

                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className={styles.errors}>{formik.errors.email}</div>
                ) : null}

                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={styles.errors}>{formik.errors.password}</div>
                ) : null}

                <Button
                    mt={4}
                    colorScheme='pink'
                    type='submit'
                >
                    Sign Up
                </Button>
            </FormControl>
        </form>
        )}
        </Formik>
        </Fragment>
    );
}

export default SignupForm;