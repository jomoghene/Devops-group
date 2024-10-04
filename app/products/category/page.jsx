'use client';
import CategorySideBar from '../../../components/Products/CategorySidebar';

import MainCategoryOptions from '../../../components/Products/MainCategoryOptions';
import { Text, Grid, GridItem } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const searchProducts = async function () {
  try {
    const res = await fetch(`https://api.joshuayi.com/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products`);
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function Category() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const resultData = await searchProducts(data);
      setData(resultData);
    };

    fetchData();
    // console.log(data);
  }, [data]);

  return (
    <div className='flex flex-col px-10'>
      <div>
        <Text fontSize='4xl' className='mb-3'>
          Category
        </Text>
      </div>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 4fr' }}
        gap={6}
        className='mt-3'
      >
        <GridItem>
          <CategorySideBar></CategorySideBar>
        </GridItem>
        <GridItem>
          <MainCategoryOptions products={data}></MainCategoryOptions>
        </GridItem>
      </Grid>
    </div>
  );
}
