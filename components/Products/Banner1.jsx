'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Banner1() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [isLoaded, setLoaded] = useState(false);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    fetch(`https://api.joshuayi.com/banners`)
      .then((res) => res.json())
      .then((data) => setBannerData(data));
  }, []);

  return (
    <div
      style={{
        paddingBottom: '20px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        maxWidth: '80%',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '100%',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className='flex flex-row items-center'
          containerClass='container'
          dotListClass=''
          draggable
          focusOnSelect={true}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={true}
          rewindWithAnimation={true}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          <Image
            borderRadius='2%'
            boxSize='100px'
            src={bannerData[0]?.image_source}
            fallbackSrc='https://via.placeholder.com/150'
            display={'block'}
            height={'100%'}
            marigin={'auto'}
            width={'100%'}
          />
          <Image
            borderRadius='20px'
            boxSize='100px'
            src={bannerData[5]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
            display={'block'}
            height={'100%'}
            marigin={'auto'}
            width={'100%'}
          />
          <Image
            borderRadius='20px'
            boxSize='100px'
            src={bannerData[6]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
            display={'block'}
            height={'100%'}
            marigin={'auto'}
            width={'100%'}
          />
          <Image
            borderRadius='20px'
            boxSize='100px'
            src={bannerData[7]?.image_source}
            alt='Clothing'
            fallbackSrc='https://via.placeholder.com/150'
            display={'block'}
            height={'100%'}
            marigin={'auto'}
            width={'100%'}
          />
        </Carousel>
      </div>
    </div>
  );
}
