import styles from './Form.module.css'

const FormErrorMessage = ({touched, errors}) => {
    if (errors && touched) {
        return <div className={styles['validation-error--text']}>{errors}</div>
    }
    return null;
}

export default FormErrorMessage;