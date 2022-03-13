import Link from 'next/link';
import { Menu, MenuGroup, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout, FcManager, FcOrganization, FcMoneyTransfer, FcKey } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import {GiSeatedMouse} from 'react-icons/gi'

const NavBar = () =>{

    return (
        <Flex p='2' borderBottom='1px' borderColor='gray.100'>
            <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
                <Link href='/' paddingLeft='2'>REMY ᘛ⁐̤ᕐᐷ</Link>
            </Box>
            <Spacer />
            <Box>
            <Menu>
                <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
                <MenuList minWidth='240px'>
                    <MenuGroup title='Pages'>
                        <Link href='/' passHref>
                            <MenuItem icon={<FcHome />}>Home</MenuItem>
                        </Link>
                        <Link href='/about' passHref>
                            <MenuItem icon={<FcAbout />}>About</MenuItem>
                        </Link>
                    </MenuGroup>
                    <MenuGroup title='Property Options'>
                        <Link href='/search?purpose=for-rent' passHref>
                            <MenuItem icon={<BsSearch />}>Search Rentals</MenuItem>
                        </Link>
                        <Link href='/search?purpose=for-sale' passHref>
                            <MenuItem icon={<FcMoneyTransfer />}>Buy Property</MenuItem>
                        </Link>
                    </MenuGroup>
                     <MenuGroup title='User Options'>
                        <Link href='/' passHref>
                            <MenuItem icon={<FcManager />}>Sign Up | Login</MenuItem>
                        </Link>
                        <Link href='/settings' passHref>
                            <MenuItem icon={<FcKey />}>Settings</MenuItem>
                        </Link>
                    </MenuGroup>
                </MenuList>
            </Menu>
            </Box>
        </Flex>
    )
}

export default NavBar;