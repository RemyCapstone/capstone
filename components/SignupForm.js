import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .required('Required'),
          lastName: Yup.string()
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .required('Required')
        }),
        onSubmit: values => {
          submitHandler(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;