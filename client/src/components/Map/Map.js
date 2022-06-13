// local imports
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SimpleContext } from "../SimpleContext";

// react google map imports
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Map,
  InfoWindow,
} from "react-google-maps";

// react icons imports
import { FaAirbnb } from "react-icons/fa";
// components imports
import PlanningBar from "../PlanningBar";
import mapStyles from "./mapStyles";

const airbnbIcon = {
  path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
  fillColor: "#64be67",
  fillOpacity: 1,
  scale: 0.05, //to reduce the size of icons
};

// render a google map imported from the react google map library
const EmptyMap = () => {
  const {
    airbnbResults,
    hotelsResults,
    selectedAirbnb,
    setSelectedAirbnb,
    selectedHotel,
    setSelectedHotel,
  } = useContext(SimpleContext);

  // set a state to track the selected airbnb and hotel which users click
  // const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  // const [selectedHotel, setSelectedHotel] = useState(null);

  // console.log(hotelsResults);
  // render airbnb locations
  return (
    airbnbResults &&
    hotelsResults && (
      <>
        {/* create a new google map with a default center */}
        <GoogleMap
          // initial options and styling
          defaultZoom={13}
          defaultCenter={{
            lat: airbnbResults[0].lat,
            lng: airbnbResults[0].lng,
            // lat: hotelsResults[0].latitude,
            // lng: hotelsResults[0].longitude,
          }}
          defaultOptions={{ styles: mapStyles }}
          // defaultCenter={{ lat: results[0].lat, lng: results[0].lng }}
        />
        {/* <Marker position={{ lat: 45.49474477767944, lng: -73.58054399490356 }} /> */}
        {/* map over airbnb api and create markers for each of them */}
        {airbnbResults.map((airbnb, index) => {
          return (
            <Marker
              // spread creates a copy of the array to have numbers of markers to arrays length
              {...airbnb}
              key={airbnb.id}
              position={{
                lat: airbnbResults[index].lat,
                lng: airbnbResults[index].lng,
              }}
              onMouseOver={() => {
                setSelectedAirbnb(airbnb);
              }}
              onClick={() => {
                setSelectedAirbnb(airbnb);
              }}
              icon={{
                url: "/airbnb_icon_32.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          );
        })}
        {/* if an airbnb is selected show info window */}
        {selectedAirbnb ? (
          <InfoWindow
            position={{
              lat: selectedAirbnb.lat,
              lng: selectedAirbnb.lng,
            }}
            onMouseOut={() => {
              setSelectedAirbnb(null);
            }}
            onCloseClick={() => {
              setSelectedAirbnb(null);
            }}
          >
            <InfoName>{selectedAirbnb.name}</InfoName>
          </InfoWindow>
        ) : null}
        {/* map over hotels ap(i and create markers for each of them */}
        hotelsResults && (
        {hotelsResults.map((hotel, index) => {
          return (
            <Marker
              // spread creates a copy of the array to have numbers of markers to arrays length
              {...hotelsResults}
              key={hotel.geoId}
              position={{
                lat: hotel.latitude,
                lng: hotel.longitude,
              }}
              onMouseOver={() => {
                setSelectedHotel(hotel);
              }}
              onClick={() => {
                setSelectedHotel(hotel);
              }}
              icon={{
                url: "/hotel_icon_64.png",
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          );
        })}
        {/* if a hotel is selected show info window */}
        {selectedHotel ? (
          <InfoWindow
            position={{
              lat: selectedHotel.latitude,
              lng: selectedHotel.longitude,
            }}
            onMouseOut={() => {
              setSelectedHotel(null);
            }}
            onCloseClick={() => {
              setSelectedHotel(null);
            }}
          >
            <InfoName>{selectedHotel.name}</InfoName>
          </InfoWindow>
        ) : null}
        )
      </>
    )
    // )
  );
};

const WrappedMap = withScriptjs(withGoogleMap(EmptyMap));
const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

// this map will show an empty map - it's not being rendered
const NullMap = () => {
  const {
    airbnbResults,
    hotelsResults,
    selectedAirbnb,
    setSelectedAirbnb,
    selectedHotel,
    setSelectedHotel,
  } = useContext(SimpleContext);

  console.log(hotelsResults);
  return hotelsResults ? (
    <Wrapper>
      <PlanningDiv>
        <PlanningBar />
      </PlanningDiv>
      <ResultsDiv>
        {hotelsResults.map((hotel) => {
          return (
            <Ul>
              <li>Hotels details</li>
              <li>{hotel.name}</li>
            </Ul>
          );
        })}

        <MapDiv style={{ width: "70%", height: "80vh" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
            loadingElement={
              <div style={{ height: "100%", borderRadius: "0rem" }} />
            }
            containerElement={
              <div style={{ height: "100%", borderRadius: "0rem" }} />
            }
            mapElement={
              <div style={{ height: "100%", borderRadius: "0rem" }} />
            }
          />
        </MapDiv>
      </ResultsDiv>
    </Wrapper>
  ) : null;
};
const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 100%;
`;
const MapDiv = styled.div`
  padding: 0;
`;
const InfoName = styled.div`
  font-weight: 600;
`;
const PlanningDiv = styled.div`
  width: auto;
  align-self: center;
`;
const ResultsDiv = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-self: flex-start;
  border-top: 1px solid var(--color-light-blue);
`;
const Ul = styled.ul`
  width: 30%;
  padding: 20px;
`;

export default NullMap;
