'use client';
import ProductCard from '../components/ProductCard';
import Banner1 from '../components/Products/Banner1';
import Banner2 from '../components/Products/Banner2';
import { useEffect, useState } from 'react';

import { Text, SimpleGrid } from '@chakra-ui/react';

export default function Home() {
  const [isLoaded, setLoaded] = useState(false);
  const [productsData, setProductData] = useState([]);

  useEffect(() => {
    fetch(`https://api.joshuayi.com/products/`)
      .then((res) => res.json())
      .then((data) => setProductData(data));
  }, []);

  return (
    <div className='bg-gray-100'>
      <Banner1></Banner1>
      <Banner2></Banner2>
      <div className='max-w-[80%] relative my-0 mx-auto pb-20'>
        <div className='mt-10 flex flex-col'>
          <Text fontSize='3xl' as='b' color='#59c1c1'>
            Featured Products
          </Text>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} mt={5}>
            {productsData.map((curr, idx) => {
              return <ProductCard product={curr} key={idx}></ProductCard>;
            })}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}
