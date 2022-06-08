import React from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import styled from "styled-components";

const EmptyMap = () => {
  return (
    <>
      // create a new google map with a default center
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 45.49474477767944, lng: -73.58054399490356 }}
      />
      <Marker position={{ lat: 45.49474477767944, lng: -73.58054399490356 }} />
    </>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(EmptyMap));
const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

const NullMap = () => {
  return (
    <Div style={{ width: "70%", height: "80vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={
          <div style={{ height: "100%", borderRadius: "5rem" }} />
        }
        containerElement={
          <div style={{ height: "100%", borderRadius: "5rem" }} />
        }
        mapElement={<div style={{ height: "100%", borderRadius: "5rem" }} />}
      />
    </Div>
  );
};
const Div = styled.div`
  padding: 20px 0;
`;

export default NullMap;
