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

export default function CheckoutSummary() {
  const cartItems = useSelector((state) => state.cart.cartItemCount);
  const cartCost = useSelector((state) => state.cart.totalPrice);

  const router = useRouter();

  const handleClick = function () {
    router.push('/checkout');
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>
          Subtotal ({cartItems}
          {cartItems > 1 ? ' items' : ' item'}): ${cartCost.toFixed(2)}
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
            <Button onClick={handleClick}>Checkout</Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
