'use client';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  deleteFromCart,
} from '../../features/slices/cart.slice';

// import AddToCartBtn from '../Cart/AddToCartBtn';

export default function QuantityAdjuster({ product }) {
  const dispatch = useDispatch();

  const handleAdd = function () {
    dispatch(increment({ productId: product.productId, price: product.price }));
  };

  const handleMinus = function () {
    dispatch(decrement({ productId: product.productId, price: product.price }));
  };

  const handleDelete = function () {
    dispatch(
      deleteFromCart({ productId: product.productId, price: product.price }),
    );
  };

  return (
    <>
      {product?.quantity > 0 ? (
        <div className='flex flex-row items-center justify-center'>
          <InputGroup>
            <InputLeftElement>
              <IconButton icon={<AddIcon />} onClick={handleAdd}></IconButton>
            </InputLeftElement>
            <Input
              isReadOnly={true}
              value={product.quantity}
              textAlign={'center'}
            ></Input>
            <InputRightElement>
              {product.quantity == 1 ? (
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={handleDelete}
                ></IconButton>
              ) : (
                <IconButton
                  icon={<MinusIcon />}
                  onClick={handleMinus}
                ></IconButton>
              )}
            </InputRightElement>
          </InputGroup>
        </div>
      ) : (
        <>{/* <AddToCartBtn product={product}></AddToCartBtn> */}</>
      )}
    </>
  );
}
