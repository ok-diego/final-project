import React, { useContext } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Map,
  InfoWindow,
} from "react-google-maps";
import styled from "styled-components";
import { SimpleContext } from "../SimpleContext";

import airbnb from "../../assets/airbnb_travel_icon.svg";

const airbnbIcon = {
  path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
  fillColor: "#64be67",
  fillOpacity: 1,
  scale: 0.05, //to reduce the size of icons
};

const EmptyMap = () => {
  const { airbnbResults, hotelsResults } = useContext(SimpleContext);

  console.log(hotelsResults);
  // render airbnb locations
  return (
    airbnbResults && (
      <>
        {/* create a new google map with a default center */}
        <GoogleMap
          // google={this.props.google}
          defaultZoom={12}
          defaultCenter={{
            lat: airbnbResults[0].lat,
            lng: airbnbResults[0].lng,
          }}
          // defaultCenter={{ lat: results[0].lat, lng: results[0].lng }}
        />
        {/* <Marker position={{ lat: 45.49474477767944, lng: -73.58054399490356 }} /> */}
        {airbnbResults.map((result, index) => {
          return (
            <Marker
              icon={{
                path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillOpacity: 1.0,
                fillColor: "#0000ff",
                strokeWeight: 0,
                scale: 1,
              }}
              key={result.id}
              {...result}
              position={{
                lat: airbnbResults[index].lat,
                lng: airbnbResults[index].lng,
              }}
            />
          );
        })}
        // render hotels locations
        {hotelsResults &&
          hotelsResults.map((result, index) => {
            return (
              <Marker
                icon={{
                  path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                  fillOpacity: 1.0,
                  fillColor: "#FF0000",
                  strokeWeight: 0,
                  scale: 1,
                }}
                key={result.geoId}
                // the spread operator is creating a copy of the array to have numbers of markers
                // to the arrays length
                {...hotelsResults}
                position={{
                  lat: result.latitude,
                  lng: result.longitude,
                }}
              />
            );
          })}
      </>
    )
  );
};

const WrappedMap = withScriptjs(withGoogleMap(EmptyMap));
const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

// this map will show an empty map - it's not being rendered
const NullMap = () => {
  // Marker component just return its children
  // const Marker = ({ children }) => children;
  return (
    <Div style={{ width: "70%", height: "80vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={
          <div style={{ height: "100%", borderRadius: "3rem" }} />
        }
        containerElement={
          <div style={{ height: "100%", borderRadius: "3rem" }} />
        }
        mapElement={<div style={{ height: "100%", borderRadius: "3rem" }} />}
        // {...results.map((result) => {
        //   // attach latitude and longitude to our Markers to display them
        //   return <Marker key={result.id} lat={result.lat} lng={result.lng} />;
        // })}
      />
    </Div>
  );
};
const Div = styled.div`
  padding: 20px 0;
`;

export default NullMap;
