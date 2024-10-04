'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// import Map from './Map';
const Map = dynamic(() => import('./Map'), { ssr: false });

export default function LcoationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        onClick={onOpen}
        color='black'
        background={'none'}
        _hover={{ color: 'black', background: '#D9F1F1' }}
      >
        Deliver to [location]
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Map></Map>
            {/* <div className='flex flex-row items-center justify-center mt-5'>
              <Input placeholder='medium size' size='md' />
              <Button colorScheme='teal' size='md'>
                Apply
              </Button>
            </div> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
