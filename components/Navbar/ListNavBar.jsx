'use client';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const get_categories = async function () {
  try {
    const res = await fetch(`https://api.joshuayi.com/category`);
    if (!res.ok) {
      throw new Error('Error accessing category endpoint');
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error fetching categories', error);
    return [];
  }
};

export default function ListNavBar() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async function () {
      const data = await get_categories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // console.log(categories);
  return (
    <div className='flex flex-row gap-5'>
      {categories.map((curr, id) => {
        return (
          <Menu trigger='hover' key={id} autoSelect={false}>
            <MenuButton
              trigger='hover'
              as={Button}
              bg='transparent'
              rightIcon={<ChevronDownIcon />}
              // color='#59c1c1'
              color='black'
              _hover={{
                background: '#D9F1F1',
              }}
              _active={{ background: '#D9F1F1', color: 'black' }}
            >
              {curr.category}
            </MenuButton>
            <MenuList>
              {curr.subcategories.map((curItem, idx) => {
                return (
                  <MenuItem
                    key={idx}
                    color='black'
                    _hover={{ backgroundColor: '#D9F1F1' }}
                    _active={{ backgroundColor: '#D9F1F1' }}
                    onClick={() => {
                      router.push(`/products/category/${curItem}`);
                    }}
                  >
                    {curItem}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        );
      })}
    </div>
  );
}
