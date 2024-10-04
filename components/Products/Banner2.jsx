import NextLink from 'next/link';
import { Image } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

export default function Banner2() {
  const [isLoaded, setLoaded] = useState(false);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    fetch(`https://api.joshuayi.com/banners`)
      .then((res) => res.json())
      .then((data) => setBannerData(data));
  }, []);

  return (
    <div className='flex flex-row justify-center relative mt-20 max-w-[80%] my-0 mx-auto'>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-5'>
        <NextLink href='/' passHref>
          <Image
            objectFit='cover'
            borderTopLeftRadius={'5%'}
            src={bannerData[8]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
          />
        </NextLink>
        <NextLink href='/' passHref>
          <Image
            objectFit='cover'
            borderTopRightRadius={'5%'}
            src={bannerData[9]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
          />
        </NextLink>
        <NextLink href='/' passHref>
          <Image
            objectFit='cover'
            borderBottomLeftRadius={'5%'}
            src={bannerData[10]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
          />
        </NextLink>
        <NextLink href='/' passHref>
          <Image
            objectFit='cover'
            borderBottomRightRadius={'5%'}
            src={bannerData[11]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
          />
        </NextLink>
        {/* onset-1/2  top-1/2 left-1/2*/}
        <div className='hidden md:block absolute top-1/2 left-1/2 z-100 w-32 h-32 bg-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
      </div>
    </div>
  );
}
