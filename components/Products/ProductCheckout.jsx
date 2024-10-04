'use client';
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text,
  Highlight,
} from '@chakra-ui/react';

// import { useSelector } from 'react-redux';
import QuantityAdjuster from './QuantityAdjuster';

import BuyNowBtn from '../Cart/BuyNowBtn';

export default function ProductCheckout({ product }) {
  // const cartItems = useSelector((state) => state.cart.cartItemCount);
  // const cartCost = useSelector((state) => state.cart.totalPrice);
  // console.log(product.quantity);

  let discount = Math.round((product.discount / product.price) * 100);
  discount = discount.toString();

  return (
    <Card w='250px'>
      <CardHeader>
        <Heading size='md'>Subtotal</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='s' textTransform='uppercase'>
              Cost
            </Heading>
            {discount === '0' ? (
              <></>
            ) : (
              <div className='flex flex-row items-center gap-5'>
                <div>
                  <Text pt='2' fontSize='md' as='s'>
                    ${product.price}
                  </Text>
                </div>
                <div>
                  <Highlight
                    query={`${discount}% off`}
                    styles={{
                      px: '1',
                      py: '1',
                      rounded: 'full',
                      bg: 'blue.100',
                    }}
                  >
                    {`${discount}% off`}
                  </Highlight>
                </div>
              </div>
            )}

            <Text>${product.price - product.discount}</Text>
          </Box>
          <Box>
            <BuyNowBtn productDetails={product}></BuyNowBtn>
            <QuantityAdjuster product={product}></QuantityAdjuster>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
