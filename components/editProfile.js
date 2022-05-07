import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useRef } from "react";

const editProfile = ({isOpen, onClose, firstName, lastName, email}) => {
  const firstField = useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Edit Profile</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  ref={firstField}
                  id="firstName"
                  placeholder={firstName}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input id="lastName" placeholder={lastName} />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder={email} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );

}

export default editProfile;