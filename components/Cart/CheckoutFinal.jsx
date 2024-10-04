import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function CheckoutFinal() {
  // const cartItems = useSelector((state) => state.cart.cartItemCount);
  const cartCost = useSelector((state) => state.cart.totalPrice);
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>
          {/* Subtotal ({cartItems}
          {cartItems > 1 ? ' items' : ' item'}): ${cartCost} */}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
            <Text pt='2' fontSize='sm'>
              View a summary of all your cart products
            </Text>
          </Box>
          <Box>
            <Button>Pay Now</Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
