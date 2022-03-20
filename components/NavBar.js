import Link from 'next/link';
import { Menu, MenuGroup, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Avatar, Text, HStack} from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout, FcManager, FcOrganization, FcMoneyTransfer, FcKey } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import {GiSeatedMouse} from 'react-icons/gi'

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const NavBar = () =>{
    const {data: session} = useSession();
    return (
      <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
          <Link href="/" paddingLeft="2">
            REMY ᘛ⁐̤ᕐᐷ
          </Link>
        </Box>
        <Spacer />
        {/* If there is a session, display the user's name on the top right. */}
        {/* TODO: needs help styling :D */}
        {session ? (
          <HStack spacing="6px" paddingRight={5}>
            <Box fontSize="xl">
              <Avatar
                fontWeight="bold"
                size="sm"
                name={`${session.user.firstName + " " + session.user.lastName}`}
              />
            </Box>
            <Box>
              <Text fontSize="lg" as="b">
                {session.user.firstName}
              </Text>
            </Box>
          </HStack>
        ) : null}

        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant="outline"
              color="red.400"
            />
            <MenuList minWidth="240px">
              <MenuGroup title="Pages">
                <Link href="/" passHref>
                  <MenuItem icon={<FcHome />}>Home</MenuItem>
                </Link>
                <Link href="/about" passHref>
                  <MenuItem icon={<FcAbout />}>About</MenuItem>
                </Link>
              </MenuGroup>
              <MenuGroup title="Property Options">
                <Link href="/search?purpose=for-rent" passHref>
                  <MenuItem icon={<BsSearch />}>Search Rentals</MenuItem>
                </Link>
                <Link href="/search?purpose=for-sale" passHref>
                  <MenuItem icon={<FcMoneyTransfer />}>Buy Property</MenuItem>
                </Link>
              </MenuGroup>
              <MenuGroup title="User Options">
                {/* If there is a session, the sign out option should replace the login option. */}
                {session ? (
                  <MenuItem onClick={() => signOut()} icon={<FcManager />}>
                    Sign Out
                  </MenuItem>
                ) : (
                  <Link href="/login" passHref>
                    <MenuItem icon={<FcManager />}>Login</MenuItem>
                  </Link>
                )}

                <Link href="/settings" passHref>
                  <MenuItem icon={<FcKey />}>Settings</MenuItem>
                </Link>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    );
}

export default NavBar;