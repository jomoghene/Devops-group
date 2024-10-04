'use client';
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  FaSortAmountDown,
  FaSortAmountUp,
  // FaSortAmountDownAlt,
  // FaSortAmountUpAlt,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

import ProductCard from '../ProductCard';

export default function CategoryOptions({ products }) {
  // console.log(products);
  const [sortMethod, setSortMethod] = useState('Unsorted');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [discountSwitch, setDiscountSwitch] = useState(false);

  useEffect(() => {
    switch (sortMethod) {
      case 'Newest':
        setFilteredProducts(
          [...products].sort((a, b) => {
            const dateA = new Date(a.date_created);
            const dateB = new Date(b.date_created);
            return dateB - dateA;
          }),
        );
        break;
      case 'Highest Rated':
        setFilteredProducts(
          [...products].sort((a, b) => {
            return b.rating - a.rating;
          }),
        );
        break;
      case 'Price Ascending':
        setFilteredProducts(
          [...products].sort((a, b) => {
            return a.price - b.price;
          }),
        );
        break;
      case 'Price Descending':
        setFilteredProducts(
          [...products].sort((a, b) => {
            return b.price - a.price;
          }),
        );
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  }, [sortMethod, products]);

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-row items-center justify-start gap-4'>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={
                sortMethod == 'Price Ascending' ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )
              }
              colorScheme={'white'}
              color={'black'}
              _hover={{ backgroundColor: 'gray.100' }}
            >
              Sort By: {sortMethod}
            </MenuButton>
            <MenuList>
              <MenuItem
                minH='20px'
                onClick={() => {
                  setSortMethod('Unsorted');
                }}
              >
                <Text fontSize='md'>Unsorted</Text>
              </MenuItem>
              <MenuItem
                minH='20px'
                onClick={() => {
                  setSortMethod('Newest');
                }}
              >
                <Text fontSize='md'>Newest</Text>
              </MenuItem>
              <MenuItem
                minH='20px'
                onClick={() => {
                  setSortMethod('Highest Rated');
                }}
              >
                <Text fontSize='md'>Highest Rated</Text>
              </MenuItem>
              <MenuItem
                minH='20px'
                onClick={() => {
                  setSortMethod('Price Ascending');
                }}
              >
                <Text fontSize='md'>Price Ascending</Text>
              </MenuItem>
              <MenuItem
                minH='20px'
                onClick={() => {
                  setSortMethod('Price Descending');
                }}
              >
                <Text fontSize='md'>Price Descending</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='sm'>
              <div className='flex flex-row items-center justify-between'>
                <Text>All Products</Text>
                <Text>
                  {filteredProducts?.length} product
                  {filteredProducts?.length == 1 ? '' : 's'}
                </Text>
              </div>
            </Heading>
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            overflowY='auto'
            // height='800px' // Set the height to trigger vertical scrolling
            borderRadius='lg'
            borderColor='gray.200'
          >
            <Grid
              templateColumns={{
                base: '1fr',
                sm: '1fr 1fr',
                xl: '1fr 1fr 1fr',
              }}
              gap={2}
              className='mt-3'
            >
              {filteredProducts.map((curr, idx) => {
                return (
                  <GridItem key={idx}>
                    <div className='w-[300px] h-[580px]shadow-md'>
                      <ProductCard product={curr}></ProductCard>
                    </div>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
