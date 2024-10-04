import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/slices/cart.slice';
import { Button, Text } from '@chakra-ui/react';

import { FaCartArrowDown } from 'react-icons/fa';

export default function AddToCartBtn({ productDetails }) {
  // Uses redux dispatch
  const dispatch = useDispatch();

  // Cart reducer (redux) to update global state of cart items and store item in local storage
  const handleAddItem = function (e) {
    e.stopPropagation();
    dispatch(addToCart(productDetails));
  };

  return (
    <Button onClick={handleAddItem} display={'flex'} gap='2px'>
      <Text>Add to cart</Text>
      <FaCartArrowDown fontSize={20} />
    </Button>
  );
}
