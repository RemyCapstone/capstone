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

const InputField = ({name, formik, type, placeholder, label, touched, errors, value, onClick, visible}) => {
  
  return (
    <FormControl isInvalid={touched && errors}>
      <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem colSpan={2} h='10'>
              <FormLabel htmlFor={name}>{label}</FormLabel>
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
            variant="outline"
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value}
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