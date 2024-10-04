'use client';
// import { Button, ButtonGroup, Input } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

export default function AccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameDelete, setUsernameDelete] = useState('');

  const onUsernameChange = function (e) {
    setUsername(e.target.value);
  };

  const onPasswordChange = function (e) {
    setPassword(e.target.value);
  };

  const onUsernameDeleteChange = function (e) {
    setUsernameDelete(e.target.value);
  };

  // const handleResetPassword = async function (e) {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `https://api.joshuayi.com/password_update/${username}`,
  //       { new_password: password },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteAccount = async function (e) {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.delete(
  //       `https://api.joshuayi.com/users_delete/${usernameDelete}`,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setUsernameDelete('');
  // };

  return (
    <div className='bg-white'>
      <div>YOU ARE ON THE ACCOUNT PAGE</div>
      {/* 
      <Input
        variant='outline'
        placeholder='Enter username to delete account'
        value={usernameDelete}
        onChange={onUsernameDeleteChange}
      />
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
      <Input
        variant='outline'
        placeholder='Username'
        value={username}
        onChange={onUsernameChange}
      />
      <Input
        variant='outline'
        placeholder='New password'
        value={password}
        onChange={onPasswordChange}
      />

      <Button onClick={handleResetPassword}>Reset Password</Button> */}
    </div>
  );
}
