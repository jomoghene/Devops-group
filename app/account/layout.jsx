'use client';
import AccountSideBar from '../../components/Account/AccountSideBar';
// import { useSelector } from 'react-redux';

import { Grid, GridItem, Box } from '@chakra-ui/react';

let isLoggedIn = true;

export default function AccountLayout({ children }) {
  return (
    <div>
      {isLoggedIn ? (
        <Box py={10} px={10}>
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 5fr' }} // Full width on small screens, 1/3 - 2/3 split on medium and above
            gap={5}
            justifyContent='center'
            alignItems='start'
          >
            <GridItem
              borderWidth={2}
              borderRadius='md'
              borderColor='gray.200'
              w='100%'
            >
              <AccountSideBar></AccountSideBar>
            </GridItem>
            <GridItem
              borderWidth={2}
              borderRadius='md'
              borderColor='gray.200'
              w='100%'
            >
              {children}
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <div className='flex items-center justify-center bg-white py-60'>
          Please Log In Or Sign Up
        </div>
      )}
    </div>
  );
}
