'use client';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from 'react-leaflet';
import { Button, Text } from '@chakra-ui/react';
import { updateLocation } from '../../features/slices/location.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UpdateMapView({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], map.getZoom());
    }
  }, [latitude, longitude, map]);

  return null;
}

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

export default function Map() {
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);
  const dispatch = useDispatch();
  const zoomLevel = 13;
  let coords;

  // Async function to get user location with geolocation api
  const getPositionAsync = async function () {
    return new Promise((resolve, reject) => {
      // If browser supports geolocation api
      if (navigator.geolocation) {
        // Get current location
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  // Executes when clicking on 'your location' button
  const handleClick = async function () {
    try {
      // Awaits user location
      const position = await getPositionAsync();
      const { latitude, longitude } = position.coords;
      // Updates global state (redux)
      dispatch(updateLocation({ latitude, longitude }));
      coords = { latitude, longitude };
    } catch (error) {
      alert(`Could not get your current position ${error}`);
    }
  };

  // Debugging
  useEffect(() => {
    console.log('Updated Coordinates:', latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div id='map'>
      <div className='mb-3'>
        <Button
          className='border rounded-sm'
          onClick={handleClick}
          colorScheme={'blue'}
        >
          Deliver to your current location
        </Button>
      </div>
      <MapContainer
        // Map set to default value from global state
        center={[latitude, longitude]}
        zoom={18}
        scrollWheelZoom={true}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>Delivery to this location</Popup>
        </Marker>
        // Rerenders map / updates map based on new location
        <UpdateMapView latitude={latitude} longitude={longitude} />
      </MapContainer>
      <Text>Deliver to: </Text>
    </div>
  );
}
