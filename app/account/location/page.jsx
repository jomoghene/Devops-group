import dynamic from 'next/dynamic';

// Dynamically import the Map component
const Map = dynamic(() => import('../../../components/Navbar/Map'), {
  ssr: false,
});

export default function Location() {
  return (
    <div className='bg-white w-full'>
      <div className=''>Location</div>
      <Map></Map>
    </div>
  );
}
