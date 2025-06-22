import { LoadScript } from "@react-google-maps/api";

const GoogleMapWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapWrapper;
