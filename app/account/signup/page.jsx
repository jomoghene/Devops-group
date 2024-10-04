'use client';
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
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { CloseIcon } from '@chakra-ui/icons';

import { logIn } from '../../../features/slices/account.slice';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

function isPasswordStrong(password) {
  const regex =
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\/\\])[A-Za-z\d!@#$%^&*(),.?":{}|<>\/\\]{10,30}$/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/;
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/])[A-Za-z\d@$!%*?&\/]{5,30}$/;

  return regex.test(password);
}

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = function (e) {
    setUsername(e.target.value);
  };
  const handleEmailChange = function (e) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };

  const handleSignupClick = async function (e) {
    e.preventDefault();

    if (username.length == 0) {
      setErrorMessage('Username must not be empty');
      return;
    } else if (username.length > 15) {
      setErrorMessage('Username must not be greater than 15 characters');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('You must use a valid email address');
      return;
    }

    if (!isPasswordStrong(password)) {
      setErrorMessage(
        'Passwords require at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and be 5-30 characters',
      );
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'https://api.joshuayi.com/users_post',
        newUser,
      );
      if (response.data?.Error) {
        setErrorMessage(response.data?.Error);
      } else {
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
        isOpen={true}
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
            <ModalHeader color='#59c1c1'>Sign Up</ModalHeader>
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
          <ModalBody display={'flex'} flexDirection={'column'} gap={'1rem'}>
            {/* <Text>Username</Text> */}
            <Input
              placeholder='Enter a username'
              size='md'
              variant='outline'
              value={username}
              onChange={handleUsernameChange}
            />
            {/* <Text>Email</Text> */}
            <Input
              placeholder='Enter an email'
              size='md'
              variant='outline'
              value={email}
              onChange={handleEmailChange}
            />
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={handlePasswordChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text>
              *NOTE*: Please refrain from using real information on this project
              site
            </Text>
            {errorMessage == '' ? (
              <></>
            ) : (
              <Text color={'red'}>{errorMessage}</Text>
            )}
          </ModalBody>
          <ModalFooter display={'flex'} flexDirection={'column'} gap={'2rem'}>
            <Button
              color='#59c1c1'
              backgroundColor='gray.200'
              _hover={{ color: 'white', backgroundColor: '#59c1c1' }}
              _active={{ color: 'white', backgroundColor: '#59c1c1' }}
              mr={3}
              onClick={handleSignupClick}
            >
              Sign Up
            </Button>
            <div className='flex flex-row items-start gap-5'>
              <Text size='xs'>Already have an account?</Text>
              <NextLink href='/account/login' passHref>
                <Text size='xs' color='#59c1c1'>
                  Log in here
                </Text>
              </NextLink>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
