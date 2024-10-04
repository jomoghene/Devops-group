'use client';

import ProductCardDetailed from '../../components/Products/ProductCardDetailed';
import CheckoutSummary from '../../components/Cart/CheckoutSummary';
import CartIsEmpty from '../../components/Cart/CartIsEmpty';
import CartCheckoutNav from '../../components/Cart/CartCheckoutNav';

import { Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function ShoppingCart() {
  const cartItemsCount = useSelector((state) => state.cart.cartItemCount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className='flex flex-col px-10'>
      <Text fontSize='4xl' className='mb-10'>
        Cart
      </Text>
      <CartCheckoutNav></CartCheckoutNav>
      <Grid
        templateColumns={{ base: '1fr', md: '3fr 1fr' }}
        gap={6}
        className='mt-4'
      >
        <GridItem>
          <Box
            display='flex'
            flexDirection='column'
            overflowY='auto'
            // height='800px' // Set the height to trigger vertical scrolling
            borderRadius='lg'
            borderColor='gray.200'
          >
            {cartItemsCount > 0 ? (
              <>
                {cartItems.map((curr, idx) => {
                  return (
                    <ProductCardDetailed
                      product={curr}
                      key={idx}
                    ></ProductCardDetailed>
                  );
                })}
              </>
            ) : (
              <CartIsEmpty></CartIsEmpty>
            )}
          </Box>
        </GridItem>
        <GridItem>
          <CheckoutSummary></CheckoutSummary>
        </GridItem>
      </Grid>
    </div>
  );
}
