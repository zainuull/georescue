import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import MapboxMap from './MapboxMap';

function PopUp(props) {
  const { lat, lng, handleClose, setLat, setLng, setShow } = props;

  useEffect(() => {
    if (navigator.geolocation) {
      // Get the current position from geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude); // Update latitude state
          setLng(longitude); // Update longitude state
          setShow(true); // Show the map popup
        },
        (error) => {
          alert('Gagal mendapatkan lokasi. Pastikan Anda mengizinkan geolokasi.');
          console.error('Error retrieving location:', error);
        }
      );
    } else {
      alert('Geolocation tidak didukung oleh browser Anda.');
    }
  }, []);

  return (
    <div
      className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-100"
      style={{ width: '50%', zIndex: '999' }}>
      <div className="flex justify-between w-100 mb-4">
        <button
          onClick={handleClose}
          className="mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Tutup
        </button>
      </div>
      {lat && (
        <div className="mb-4">
          <h3>Koordinat:</h3>
          <div className="flex justify-between items-center">
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </div>
        </div>
      )}
      <MapboxMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
    </div>
  );
}

export default PopUp;
