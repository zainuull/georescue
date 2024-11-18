import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

useEffect(() => {
  const updateLocation = () => {
    const locationData = {
      name: 'Korban XYZ',
      coordinates: { latitude: 12.345, longitude: 67.89 }, // Ganti dengan data nyata
    };
    socket.emit('update-location', locationData);
  };

  const handleLocationUpdate = (data) => {
    setVictims((prev) => [...prev, data]);
  };

  socket.on('location-update', handleLocationUpdate);
  updateLocation(); // Call function to update location
}, []);
