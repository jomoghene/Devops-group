'use client';
import { Box, Menu, MenuItem, Avatar, Text, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import NextLink from 'next/link';

// import { useSelector } from 'react-redux';

const accountItems = [
  { title: 'Profile', ref: '/account' },
  { title: 'Location', ref: '/account/location' },
  { title: 'Orders', ref: '/account/orders' },
  { title: 'Favorites', ref: '/account/favorites' },
  { title: 'Ratings', ref: '/account/ratings' },
];

export default function AccountSideBar() {
  let username;
  if (typeof window !== 'undefined') {
    username =
      localStorage.getItem('user') != null
        ? localStorage.getItem('user')
        : 'UNKNOWN USER';
  } else {
    username = 'UNKNOWN USER';
  }

  return (
    <div className=''>
      <Box boxShadow='md'>
        <Menu>
          <MenuItem background={'white'}>
            <Avatar bg='#59c1c1' src='' />
            <div>{username}</div>
          </MenuItem>
          <>
            {accountItems.map((curr, idx) => {
              return (
                <NextLink href={curr.ref} passHref key={idx}>
                  <MenuItem
                    background={'white'}
                    color={'#59c1c1'}
                    _hover={{
                      background: '#59c1c1',
                      color: 'white',
                    }}
                  >
                    <Flex
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='space-between'
                      width='100%'
                      padding='10px'
                    >
                      <Text>{curr.title}</Text>
                      <ChevronRightIcon />
                    </Flex>
                  </MenuItem>
                </NextLink>
              );
            })}
          </>
        </Menu>
      </Box>
    </div>
  );
}
