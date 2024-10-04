'use client';
import { Card, CardBody, Text, IconButton, Divider } from '@chakra-ui/react';

import { FaShoppingCart, FaWallet } from 'react-icons/fa';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { current } from '@reduxjs/toolkit';

export default function CartCheckoutNav() {
  const router = useRouter();
  const currentPath = usePathname();

  const handleCartClick = function () {
    if (currentPath == '/cart') {
      return;
    }
    router.push('/cart');
  };

  const handleCheckoutClick = function () {
    if (currentPath == '/checkout') {
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className='flex justify-center'>
      <Card w='100%'>
        <CardBody className='flex flex-row items-center justify-evenly'>
          <div
            className={`flex flex-col items-center justify-center cursor-pointer w-[100px]`}
            onClick={handleCartClick}
          >
            <IconButton
              variant='outline'
              border='hidden'
              aria-label='Shopping Cart'
              fontSize='35px'
              color={currentPath == '/cart' ? '#59c1c1' : '#D9F1F1'}
              icon={<FaShoppingCart />}
              _hover={{ background: 'none' }}
            />
            <Text color={currentPath == '/cart' ? '#59c1c1' : '#D9F1F1'}>
              Cart
            </Text>
          </div>
          <Divider
            orientation='horizontal'
            borderWidth='1px'
            borderStyle='solid'
            borderColor={'#59c1c1'}
            width='100px'
          />
          <div
            className={`flex flex-col items-center justify-center cursor-pointer w-[100px]`}
            onClick={handleCheckoutClick}
          >
            <IconButton
              variant='outline'
              border='hidden'
              aria-label='Shopping Cart'
              fontSize='35px'
              color={currentPath == '/checkout' ? '#59c1c1' : '#B9E1E1'}
              icon={<FaWallet />}
              _hover={{ background: 'none' }}
            />
            <Text color={currentPath == '/checkout' ? '#59c1c1' : '#B9E1E1'}>
              Checkout
            </Text>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
