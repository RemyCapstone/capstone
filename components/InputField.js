import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react'

import styles from './Form.module.css'


const InputField = ({id, name, formik, type, label, touched, errors, value}) => {
  return (
    <FormControl variant="floating" id={id} isInvalid={touched && errors}>
      <InputGroup size="md">
        <Input
          spacing={2}
          variant="outline"
          id={id ? id : name} //if no id is provided, set id to name
          name={name}
          type={type}
          placeholder=" " //required for floating label design
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={value}
          className={styles.input}
        />
      <FormLabel htmlFor={name}>
        {label}
      </FormLabel>
      </InputGroup>

    </FormControl>
  );
}

export default InputField;