import Link from 'next/link';
import {
  Menu, MenuGroup, MenuButton, MenuList, MenuItem, MenuDivider,
  Flex,
  Box,
  Spacer,
  Avatar,
  Text,
  HStack,
  IconButton, Button,
} from '@chakra-ui/react';
import {
  ChevronDownIcon
} from '@chakra-ui/icons';

import {
  FcMenu,
  FcHome,
  FcAbout,
  FcManager,
  FcMoneyTransfer,
  FcExport,
} from "react-icons/fc";
import { BsSearch } from 'react-icons/bs';
import { SiZillow } from 'react-icons/si';
import {FaMapMarkedAlt} from 'react-icons/fa'

import { useMediaQuery } from '@chakra-ui/react'

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
// import { server } from "../../config/index";
const NavBar = () =>{
    /* Media query for screen responsiveness
    *
    * Less than 1020px: treat as mobile
    * Greater than 1020px: expand navbar and treat as desktop
    */
    const [isDesktopWidth] = useMediaQuery('(min-width: 1150px)');

    // User session
    const { data : session} = useSession();
    // console.log("This is my session from Navbar:", session);
    // console.log('This is location from Navbar: ', window.location.href)

    let prevPage = '/'
    if (typeof window !== "undefined")
      prevPage = window.location.href.includes('profile') ? '/' : window.location.href;
    return (
      <Flex p="2" borderBottom="1px" borderColor="gray.100" align="center">
        {isDesktopWidth ? (
          // Desktop styles
          <>
            <Box fontSize="3xl" color="blue.400" fontWeight="bold">
              <Link href="/" paddingLeft="2">
                REMY ᘛ⁐̤ᕐᐷ
              </Link>
            </Box>
            <Spacer />
            {/* If there is a session, display the user's name on the top right. */}
            {/* TODO: needs help styling :D */}
            <Link href="/" passHref>
              <Button variant="ghost" leftIcon={<FcHome />} marginRight='1'>
                Home
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button variant="ghost" leftIcon={<FcAbout />} marginRight='1'>
                About
              </Button>
            </Link>
            <Link href="/hotzonemap" passHref>
              <Button variant="ghost" leftIcon={<FaMapMarkedAlt />} marginRight='1'>
                Violations Map
              </Button>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <Button variant="ghost" leftIcon={<BsSearch />} marginRight='1'>
                Search Rentals
              </Button>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <Button variant="ghost" leftIcon={<FcMoneyTransfer />} marginRight='1'>
                Buy Property
              </Button>
            </Link>
            <Link href="/searchByZillow" passHref>
              <Button variant="ghost" leftIcon={<SiZillow />} marginRight='1'>
                Zillow Search
              </Button>
            </Link>
            {/* Show User info if logged in, nothing if not. */}
            {session ? (
              <Menu>
                <MenuButton
                    as={Button}
                    variant="ghost"
                    rightIcon={<ChevronDownIcon />}
                    minWidth='100px'
                  >
                    <Flex alignItems='center'>
                      <Box fontSize="xl">
                        <Avatar
                          fontWeight="bold"
                          alignSelf="end"
                          size="sm"
                          name={`${
                            session.user.firstName + " " + session.user.lastName
                          }`}
                          src={session.user.imageUrl ? session.user.imageUrl : null}
                          marginRight='1'
                        />
                      </Box>
                      <Text fontSize="lg" as="b">
                        {session.user.firstName}
                      </Text>
                    </Flex>
                </MenuButton>
                <MenuList>
                  <Link href={`/profile/${session.user._id}`} passHref>
                    <MenuItem icon={<FcManager />}>Profile</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut({callbackUrl: prevPage})} icon={<FcExport />}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : null}
            {/* If there is a session, the sign out option should replace the login option. */}
            {session ? null : (
              <Link href="/login" passHref>
                <Button leftIcon={<FcManager />} variant="outline">
                  Login
                </Button>
              </Link>
            )}
          </>
        ) : (
          // Mobile styles
          <>
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
                    name={`${
                      session.user.firstName + " " + session.user.lastName
                    }`}
                    src={session.user.imageUrl ? session.user.imageUrl : null}
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
                    <Link href="/searchByZillow" passHref>
                      <MenuItem icon={<SiZillow />}>Zillow Search</MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuGroup title="Property Options">
                    <Link href="/search?purpose=for-rent" passHref>
                      <MenuItem icon={<BsSearch />}>Search Rentals</MenuItem>
                    </Link>
                    <Link href="/search?purpose=for-sale" passHref>
                      <MenuItem icon={<FcMoneyTransfer />}>
                        Buy Property
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuGroup title="User Options">
                    {/* If there is a session, the sign out option should replace the login option. */}
                    {session ? (<>
                      <Link href={`/profile/${session.user._id}`} passHref>
                        <MenuItem icon={<FcManager />}>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={() => signOut({callbackUrl: prevPage})} icon={<FcManager />}>
                        Sign Out
                      </MenuItem>
                      </>
                    ) : (
                      <Link href="/login" passHref>
                        <MenuItem icon={<FcManager />}>Login</MenuItem>
                      </Link>
                    )}
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Box>
          </>
        )}
      </Flex>
    );
}


export default NavBar;