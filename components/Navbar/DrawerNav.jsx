'use client';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const router = useRouter();

  return (
    <div>
      <Button
        ref={btnRef}
        bg='none'
        color='black'
        // color='#59c1c1'
        onClick={onOpen}
        rightIcon={<ChevronDownIcon />}
        _hover={{ color: 'black', background: '#D9F1F1' }}
      >
        All
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {/* Hello{' '}
            {typeof window == 'undefined'
              ? ' '
              : localStorage.getItem('user')
                ? localStorage.getItem('user')
                : ''}
            {' !'} */}
          </DrawerHeader>

          <DrawerBody>
            <Button
              onClick={() => {
                onClose();
                router.push('/products/category');
              }}
            >
              View all Products
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
