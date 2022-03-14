import {
  FormControl,
  Grid,
  GridItem,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from '@chakra-ui/react'

import styles from './Form.module.css'


const InputField = ({name, formik, type, placeholder, label, touched, errors, value, onClick, visible}) => {

  return (
    <FormControl isInvalid={touched && errors}>
      <Grid templateColumns='repeat(2, 1fr)' templateRows='1.5rem' gap={4} rowGap={2}>
          <GridItem colSpan={2} h='10'>
              <FormLabel variant='form' htmlFor={name}>{label}</FormLabel>
          </GridItem>
          {touched && errors ?
              <GridItem colStart={4} colEnd={6} h='10' color='red'>
                  {errors}
              </GridItem>
          : null}
      </Grid>
      <InputGroup size="md">
        <Input
            spacing={2}
            variant='outline'
            id={name}
            name={name}
            type={type}
            errorBorderColor='red.300'
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value}
            className={styles.input}
        />
        {
          name === 'password' || name === 'confirmPassword' ?
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={onClick}>
              { visible ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement> : null
        }
      </InputGroup>

    </FormControl>
  )
}

export default InputField;