import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  IconButton,
  Text,
  Container,
  Box,
  Button,
} from '@chakra-ui/react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import ClearCartBtn from '../../components/Cart/EmptyCartBtn';
import CartIsEmpty from './CartIsEmpty';
import ProductCardDetailed from '../Products/ProductCardDetailed';

export default function ShoppingCartBtn() {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const cartItemCount = useSelector((state) => state.cart.cartItemCount);
  const cartCost = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    setIsClient(true);

    // Load cart data from localStorage and dispatch to Redux store
    if (typeof window !== 'undefined') {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        const items = JSON.parse(savedCartItems);
        dispatch({ type: 'loadCartItems', payload: items });
      }
    }
  }, [dispatch]);

  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        <div>
          <IconButton
            variant='outline'
            border='hidden'
            aria-label='Shopping Cart'
            fontSize='35px'
            color='black'
            icon={<MdOutlineShoppingCart />}
            _hover={{ backgroundColor: '#D9F1F1' }}
          />
          {isClient && cartItemCount > 0 && (
            <span className='absolute bg-teal-500 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white'>
              <Text as='b'>{cartItemCount}</Text>
            </span>
          )}
        </div>
      </PopoverTrigger>
      {isClient && (
        <PopoverContent
          width={'100%'}
          maxW={{ base: '90vw', md: '500px' }}
          height={{ base: '450px', md: '400px' }}
          position='relative'
        >
          <div className='flex flex-col justify-evenly items-center'>
            <PopoverHeader>
              <div className='flex flex-row justify-between items-center gap-20'>
                <Text fontSize='xl'>
                  {cartItemCount} item{cartItemCount === 1 ? '' : 's'} in cart
                </Text>
                <NextLink href='/cart' passHref>
                  <Button
                    color='#59c1c1'
                    background='none'
                    _hover={{ backgroundColor: '#59c1c1', color: 'white' }}
                  >
                    Go to cart
                  </Button>
                </NextLink>
              </div>
            </PopoverHeader>
            <PopoverBody>
              <Container maxW='container.lg' flexBasis='3/4'>
                <Box
                  display='flex'
                  flexDirection='column'
                  overflowY='auto'
                  height='270px'
                  borderRadius='lg'
                  padding='4'
                >
                  {cartItems.length > 0 ? (
                    cartItems.map((curr, idx) => (
                      <ProductCardDetailed product={curr} key={idx} />
                    ))
                  ) : (
                    <CartIsEmpty />
                  )}
                </Box>
              </Container>
            </PopoverBody>
            <PopoverFooter>
              <div className='flex gap-10 items-center'>
                <Text fontSize='xl'>
                  Current Cart Cost: ${cartCost.toFixed(2)}
                </Text>
                <ClearCartBtn />
              </div>
            </PopoverFooter>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
