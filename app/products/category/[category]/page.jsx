'use client';
import CategorySideBar from '../../../../components/Products/CategorySidebar';
import CategoryOptions from '../../../../components/Products/CategoryOptions';
import { Text, Grid, GridItem } from '@chakra-ui/react';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const searchProducts = async function (subcat) {
  try {
    const res = await fetch(`https://api.joshuayi.com/category/${subcat}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products with ${subcat}`);
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function CategorySpecific() {
  const router = useRouter();
  const pathname = usePathname();
  const subcategory = pathname.split('/').pop();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const resultData = await searchProducts(subcategory);
      setData(resultData);
    };

    fetchData();
    // console.log(data);
  }, [subcategory]);

  return (
    <div className='flex flex-col px-10'>
      <div>
        <Text fontSize='4xl' className='mb-3'>
          Category: {subcategory}
        </Text>
      </div>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 4fr' }}
        gap={6}
        className='mt-3'
        width='100%'
      >
        <GridItem>
          <CategorySideBar></CategorySideBar>
        </GridItem>
        <GridItem>
          <CategoryOptions products={data}></CategoryOptions>
        </GridItem>
      </Grid>
    </div>
  );
}
