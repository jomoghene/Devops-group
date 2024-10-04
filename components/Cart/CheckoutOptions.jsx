import {
  Text,
  Card,
  CardBody,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function CheckoutOptions() {
  const [value, setValue] = useState('1');
  return (
    <div className='flex flex-col'>
      <div>
        <Card w='100%'>
          <CardBody className='flex flex-row items-center justify-evenly'>
            <Text>1. Delivery Address</Text>
            <Text>
              {typeof window == 'undefined'
                ? 'user'
                : localStorage.getItem('user')}
            </Text>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card w='100%'>
          <CardBody className='flex flex-col items-center justify-evenly'>
            <Text>2. Payment Method</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction='column'>
                <Radio value='1'>Credit/Debit Card</Radio>
                <Radio value='2'>Venmo</Radio>
                <Radio value='3'>Paypal</Radio>
              </Stack>
            </RadioGroup>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
