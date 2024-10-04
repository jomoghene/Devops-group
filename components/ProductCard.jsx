'use client';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  AspectRatio,
  Flex,
} from '@chakra-ui/react';

import AddToCartBtn from './Cart/AddToCartBtn';
import BuyNowBtn from './Cart/BuyNowBtn';
import { useRouter } from 'next/navigation';

const starRating = function (rating) {
  let fullStars = Math.floor(rating);
  let halfStars = rating - fullStars;
  if (halfStars >= 0.5) {
    halfStars = 1;
  } else {
    halfStars = 0;
  }
  let emptyStars = 5 - fullStars - halfStars;

  const fullStarArr = [...Array(fullStars)];
  const halfStarArr = [...Array(halfStars)];
  const emptyStarArr = [...Array(emptyStars)];

  return (
    <div className='flex flex-row'>
      {fullStarArr.map((curr, index) => {
        return <img src='/star.svg' width={15} height={15} key={index}></img>;
      })}
      {halfStarArr.map((curr, index) => {
        return (
          <img
            src='/half-star.svg'
            width={15}
            height={15}
            className='clip-path-polygon-left-half'
            key={index}
          ></img>
        );
      })}
      {emptyStarArr.map((_, index) => {
        return (
          <img src='/empty-star.svg' width={15} height={15} key={index}></img>
        );
      })}
    </div>
  );
};

export default function ProductCard({ product }) {
  const router = useRouter();
  return (
    <Card
      h='100%'
      onClick={() => {
        router.push(`/products/${product.productId}`);
      }}
      cursor='pointer'
    >
      <CardBody>
        <Flex direction='column' alignItems='center'>
          <AspectRatio ratio={4 / 3} w='100%' maxW='300px'>
            <Image
              objectFit='cover'
              boxSize='300px'
              src={product.img}
              alt={product.alt}
              borderRadius='lg'
              width='100%'
              height='100%'
            />
          </AspectRatio>
          <Stack
            spacing='2'
            paddingTop='10px'
            alignItems='flex-start'
            w='100%'
            maxW='300px'
          >
            <Heading size='md'>{product.productname}</Heading>
            <Text>{product.description}</Text>
            <Text color='#59c1c1' fontSize='2xl'>
              ${product.price}
            </Text>
            <div className='flex flex-row gap-2'>
              <Text>{product.rating}</Text>
              {starRating(product.rating)}
            </div>
          </Stack>
        </Flex>
      </CardBody>
      <Divider borderColor={'gray.400'} />
      <CardFooter>
        <div className='flex flex-row justify-evenly items-center w-full'>
          <BuyNowBtn productDetails={product}></BuyNowBtn>
          <AddToCartBtn productDetails={product} />
        </div>
      </CardFooter>
    </Card>
  );
}
