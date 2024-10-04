'use client';

import { useState } from 'react';

export default function ProductGallery({ product }) {
  const [mainImg, setMainImg] = useState(product.img);
  const [selectedImg, setSelectedImg] = useState(product.img);

  return (
    <div className='flex flex-col lg:w-[400px] w-[300px] mb-10'>
      <div className='mb-1 shadow-xl'>
        <img
          src={mainImg}
          alt='main product image'
          className={`object-cover w-full lg:h-[400px] h-[300px] rounded-lg`}
        />
      </div>
      <div className='flex flex-row'>
        <img
          src={product.img}
          alt='gallery main product image'
          onClick={() => {
            setMainImg(product.img);
            setSelectedImg(product.img);
          }}
          className={`object-cover cursor-pointer w-1/3 h-[100px] rounded-sm ${selectedImg === product.img ? ' border-solid border-2 border-gray-50 shadow-2xl' : ''}`}
        />
        <img
          src={product.gallery_1}
          alt='first product gallery image'
          onClick={() => {
            setMainImg(product.gallery_1);
            setSelectedImg(product.gallery_1);
          }}
          className={`object-cover cursor-pointer w-1/3 h-[100px] rounded-sm ${selectedImg === product.gallery_1 ? 'border-solid border-2 border-gray-50 shadow-2xl' : ''}`}
        />
        <img
          src={product.gallery_2}
          alt='second product gallery image'
          onClick={() => {
            setMainImg(product.gallery_2);
            setSelectedImg(product.gallery_2);
          }}
          className={`object-cover cursor-pointer w-1/3 h-[100px] rounded-sm ${selectedImg === product.gallery_2 ? 'border-solid border-2 border-gray-50 shadow-2xl' : ''}`}
        />
      </div>
    </div>
  );
}
