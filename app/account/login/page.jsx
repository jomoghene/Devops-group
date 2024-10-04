'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import NextLink from 'next/link';
import { CloseIcon } from '@chakra-ui/icons';

import { logIn } from '../../../features/slices/account.slice';
// import { initializeCart } from '../../../features/slices/cart.slice';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogIn = async function (e) {
    console.log(emailValue, passwordValue);
    e.preventDefault();

    if (!validateEmail(emailValue)) {
      setErrorMessage('You must enter a valid email address');
      return;
    }

    const userPackage = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const response = await axios.post(
        'https://api.joshuayi.com/login',
        userPackage,
      );
      if (response.data?.Error) {
        setErrorMessage(response.data?.Error);
      } else {
        // console.log('The response data that is dispatched', response.data);
        dispatch(logIn(response.data));

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', response.data?.username);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEmailChange = function (event) {
    setEmailValue(event.target.value);
  };

  const onPasswordChange = function (event) {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.reload(true);
        }
      }, 500);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        motionPreset='none'
        isCentered={true}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg='#E5E7EB'
          opacity={1}
          bgImage={'/oceanbg.jpg'}
          bgPosition='center'
          bgRepeat='no-repeat'
          bgSize='cover'
        />
        <ModalContent>
          <div className='flex flex-row justify-between items-center pr-5 whitespace-nowrap'>
            <ModalHeader color='#59c1c1'>Log In</ModalHeader>
            <NextLink href='/' passHref>
              <IconButton
                onClick={onClose}
                icon={<CloseIcon />}
                bg={'none'}
                _hover={{
                  background: 'none',
                }}
              ></IconButton>
            </NextLink>
          </div>
          <ModalBody display={'flex'} flexDirection={'column'} gap={'2rem'}>
            <Input
              placeholder='Enter your email'
              size='md'
              variant='outline'
              value={emailValue}
              onChange={onEmailChange}
            />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter your password'
                value={passwordValue}
                onChange={onPasswordChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
          <ModalFooter display={'flex'} flexDirection={'column'} gap={'2rem'}>
            {errorMessage == '' ? (
              <></>
            ) : (
              <Text color={'red'}>{errorMessage}</Text>
            )}
            <Button
              color='#59c1c1'
              backgroundColor='gray.200'
              _hover={{ color: 'white', backgroundColor: '#59c1c1' }}
              _active={{ color: 'white', backgroundColor: '#59c1c1' }}
              mr={3}
              onClick={handleLogIn}
            >
              Log In
            </Button>
            <Checkbox defaultChecked>Remember me?</Checkbox>
            <div className='flex flex-row items-start gap-5'>
              <Text size='xs'>Don't have an account yet?</Text>
              <NextLink href='/account/signup' passHref>
                <Text size='xs' color='#59c1c1'>
                  Sign up here
                </Text>
              </NextLink>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
