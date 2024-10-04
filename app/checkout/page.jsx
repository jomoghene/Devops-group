'use client';
import { Text, Grid, GridItem } from '@chakra-ui/react';

import CartCheckoutNav from '../../components/Cart/CartCheckoutNav';
import CheckoutOptions from '../../components/Cart/CheckoutOptions';
import CheckoutFinal from '../../components/Cart/CheckoutFinal';

export default function Checkout() {
  return (
    <div className='flex flex-col px-10'>
      <div>
        <Text fontSize='4xl' className='mb-10'>
          Checkout
        </Text>
        <CartCheckoutNav></CartCheckoutNav>
      </div>
      <Grid
        templateColumns={{ base: '1fr', md: '3fr 1fr' }}
        gap={6}
        className='mt-4'
      >
        <GridItem>
          <CheckoutOptions></CheckoutOptions>
        </GridItem>
        <GridItem>
          <CheckoutFinal></CheckoutFinal>
        </GridItem>
      </Grid>
    </div>
  );
}
