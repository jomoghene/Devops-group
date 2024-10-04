import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/slices/cart.slice';
import { Button } from '@chakra-ui/react';

export default function ClearCartBtn() {
  const dispatch = useDispatch();

  const handleClearCart = function () {
    dispatch(clearCart());
  };

  return (
    <div>
      <Button
        variant='solid'
        // colorScheme='red'
        onClick={handleClearCart}
        size='sm'
        color='red'
        background='none'
        _hover={{ backgroundColor: 'red', color: 'white' }}
      >
        Empty Cart
      </Button>
    </div>
  );
}
