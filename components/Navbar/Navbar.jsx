'use client';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
  Text,
  Image,
  Box,
} from '@chakra-ui/react';

import ListNavBar from './ListNavBar';
import DrawerNav from './DrawerNav';
import ShoppingCartBtn from '../Cart/ShoppingCartBtn';
import LocationModal from '../Navbar/LocationModal';
// import ProfileBtns from '../Account/ProfileBtns';

import dynamic from 'next/dynamic';

const ProfileBtns = dynamic(() => import('../Account/ProfileBtns'), {
  ssr: false, // Disable SSR for this component
});

const handleSearch = async function (term, setSearchResults, setSearchData) {
  try {
    const res = await fetch(`https://api.joshuayi.com/search/${term}`);
    if (!res.ok) {
      throw new Error('Invalid Search');
    }
    const data = await res.json();
    setSearchResults(data);
    setSearchData(data);
    console.log(data);
    return;
  } catch (error) {
    console.log('Cannot find item', error);
    setSearchResults([]);
  }
};

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSearchResults([]);
        setSearchTerm('');
      }
    };

    const handleClickInside = (event) => {
      if (searchBarRef.current && searchBarRef.current.contains(event.target)) {
        if (searchTerm != '') {
          setSearchResults(searchData);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickInside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickInside);
    };
  }, [searchData, searchTerm]);

  const handleSearchTermChange = function (e) {
    e.stopPropagation();
    const value = e.target.value;
    setSearchTerm(value);
    if (value != '') {
      handleSearch(value, setSearchResults, setSearchData);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = function (e) {
    if (e.key === 'Enter') {
      console.log('enter key ');
      e.preventDefault();
      handleSearch(searchTerm, setSearchResults);
    }
  };

  return (
    //  bg-gradient-to-br from-blue-200 to-cyan-100
    <div className='flex flex-col justify-center items-center mx-auto border-b-2 border-gray-300 shadow-xl'>
      <div className='flex flex-col lg:flex-row items-center justify-evenly gap-10 pl-20 pr-20 w-full pb-3 pt-6'>
        <NextLink href='/' passHref>
          <div className='flex flex-row items-center gap-2 mr-10'>
            <Image src='/icon_copy.png' boxSize='50px' />
            <Text
              as='b'
              color='#59c1c1'
              fontSize='xl'
              className='whitespace-nowrap'
            >
              Poli Shop
            </Text>
          </div>
        </NextLink>

        <div className='w-full relative' ref={searchBarRef}>
          <InputGroup size='md' ref={searchBarRef}>
            <Input
              placeholder='Search for items...'
              width='90%'
              variant='filled'
              onChange={handleSearchTermChange}
              onKeyDown={handleKeyDown}
              bg='gray.100'
              _focus={{ backgroundColor: 'gray.100' }}
            />

            <InputRightAddon width='4.5rem'>
              <IconButton
                colorScheme='white'
                color='black'
                aria-label='Search Items'
                icon={<SearchIcon />}
                w='full'
                border='hidden'
                onClick={() => {
                  handleSearch(searchTerm, setSearchResults);
                }}
              />
            </InputRightAddon>
          </InputGroup>

          {searchResults.length > 0 ? (
            <Box
              position='absolute'
              // top='100%'
              width='90%'
              bg='white'
              zIndex='1000'
              boxShadow='md'
              p={4}
              mt={2}
              borderRadius='md'
            >
              <div className='flex flex-col '>
                {searchResults.map((curr, idx) => (
                  <div className='border-solid border border-gray-200'>
                    <div
                      key={idx}
                      className='flex flex-row items-center gap-10 w-full justify-start cursor-pointer hover:bg-gray-200 '
                      onClick={() => {
                        setSearchResults([]);
                        setSearchTerm('');
                        router.push(`/products/${curr.productId}`);
                      }}
                    >
                      <Image src={curr.img} boxSize='50px' alt={curr.name} />
                      <Text>{curr.productname}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          ) : searchTerm == '' ? (
            <></>
          ) : (
            <Box
              position='absolute'
              // top='100%'
              width='90%'
              bg='white'
              zIndex='1000'
              boxShadow='md'
              p={4}
              mt={2}
              borderRadius='md'
            >
              No Items Found
            </Box>
          )}
        </div>

        <ProfileBtns></ProfileBtns>
        <ShoppingCartBtn></ShoppingCartBtn>
      </div>
      <div className='flex flex-row items-center justify-evenly gap-3 p-2 w-full pb-3'>
        <DrawerNav></DrawerNav>
        <div className='hidden md:block'>
          <ListNavBar></ListNavBar>
        </div>
        <div>
          <LocationModal></LocationModal>
        </div>
      </div>
    </div>
  );
}
