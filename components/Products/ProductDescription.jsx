import { Text } from '@chakra-ui/react';

export default function ProductDescription({ product }) {
  let formattedStringArr = [];
  if (product.product_details != null) {
    formattedStringArr = product.product_details.split(';');
  }
  return (
    <div className='md:w-[600px] w-[300px]'>
      <Text fontSize='4xl' as='b'>
        {product.productname}
      </Text>
      <ul className='list-disc pl-4 pt-10'>
        {formattedStringArr.map((curr) => {
          return (
            <li>
              <Text>{curr}</Text>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
