import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
} from '@chakra-ui/react';

export default function CartIsEmpty() {
  return (
    <Card>
      <CardBody>
        <div className='flex flex-col items-center justify-center'>
          <Image
            boxSize='200px'
            src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png'
            alt='Empty Shopping Cart'
            borderRadius='lg'
          />
          <Heading size='md'>Shopping Cart Is Empty</Heading>
        </div>
      </CardBody>
    </Card>
  );
}
