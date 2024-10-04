'use client';
import { Divider, Text, Icon, Input, Button } from '@chakra-ui/react';
import { forwardRef, useEffect } from 'react';

import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { GrCertificate } from 'react-icons/gr';
import { TbTruckDelivery, TbTruckReturn } from 'react-icons/tb';
import { LuPackageCheck } from 'react-icons/lu';
import { ChevronUpIcon } from '@chakra-ui/icons';

import NextLink from 'next/link';

const footerInfoList = [
  {
    icon: RiCustomerService2Fill,
    message: '24/7 Support',
  },
  {
    icon: GrCertificate,
    message: 'Quality products',
  },
  {
    icon: LuPackageCheck,
    message: 'Delivery Tracking',
  },
  {
    icon: TbTruckDelivery,
    message: 'Fast Delivery',
  },
  {
    icon: TbTruckReturn,
    message: '7 Day Return',
  },
];

const moreContactList = [
  {
    icon: FaGithub,
    link: 'https://github.com/Joshua-R-Yi',
    arialabel: 'github',
  },
  {
    icon: FaDiscord,
    link: 'https://discord.gg',
    arialabel: 'discord',
  },
  {
    icon: AiFillInstagram,
    link: 'https://www.instagram.com/joshua_.i/',
    arialabel: 'instagram',
  },
  {
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/joshua-y-2a8a34282/',
    arialabel: 'linkedin',
  },
];

export default function Footer() {
  useEffect(() => {
    const backToTop = function () {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const backToTopButton = document.getElementById('back-to-top-button');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', backToTop);
    }

    return () => {
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', backToTop);
      }
    };
  }, []);

  return (
    // bg-gradient-to-tr from-blue-200 to-cyan-100
    <div className='flex flex-col w-full gap-5 pl-20 pr-20 pt-5'>
      <div className='flex flex-col sm:flex-row justify-between'>
        <div className='flex flex-row gap-5 items-center justify-center'>
          <Text fontSize='md'>We are alway here to help!</Text>
          <Divider
            orientation='vertical'
            borderWidth='1px'
            borderStyle='solid'
            borderColor={'gray'}
          />
          <Text fontSize='md'>Contact us at: polishop@gmail.com</Text>
        </div>

        <div>
          <Button
            id='back-to-top-button'
            // onClick={backToTop}
            color='black'
            background='none'
            _hover={{ backgroundColor: '#D9F1F1' }}
          >
            Back to top
            <Icon as={ChevronUpIcon}></Icon>
          </Button>
        </div>
      </div>
      <Divider
        orientation='horizontal'
        borderWidth='1px'
        borderStyle='solid'
        borderColor={'gray'}
      />
      <div className='hidden xl:flex justify-center items-center py-3 gap-20'>
        {footerInfoList.map((curr, idx) => {
          return (
            <div
              className='flex flex-row gap-4 pl-10 pr-10 items-center justify-center'
              key={idx}
            >
              <Icon as={curr.icon} boxSize={10} color='#59c1c1' />
              <Text fontSize='md'>{curr.message}</Text>
            </div>
          );
        })}
      </div>
      <div className='hidden xl:block'>
        <Divider
          orientation='horizontal'
          borderWidth='1px'
          borderStyle='solid'
          color='	#D3D3D3'
          borderColor={'gray'}
        />
      </div>
      <div className='hidden md:flex flex-row justify-between'>
        <div className='flex flex-row justify-left items-center gap-10'>
          <Text fontSize='xl'>Follow us on:</Text>
          {moreContactList.map((curr, idx) => {
            return (
              <NextLink href={curr.link} target='_blank' key={idx}>
                <Icon as={curr.icon} w={8} h={8} color='#59c1c1' />
              </NextLink>
            );
          })}
        </div>
        <div className='flex flex-row items-center'>
          <Input
            // value={value}
            // onChange={handleChange}
            placeholder='Your Email'
            size='sm'
          />
          <Button color='black' _hover={{ backgroundColor: '#D9F1F1' }}>
            Submit
          </Button>
        </div>
      </div>
      <div className='pb-5'>
        <Text as='b'>
          Quality Products, Exceptional Service, Secure Shopping
        </Text>
        <Text>
          Poli Shop is your premier online shopping partner, offering a wide
          range of carefully selected products, competitive pricing, and a
          customer-centric system. We strive to make your shopping experience
          with us a delight.
        </Text>
      </div>
    </div>
  );
}
