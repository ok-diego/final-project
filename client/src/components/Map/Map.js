// local imports
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SimpleContext } from "../SimpleContext";
import { Link } from "react-router-dom";

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

  const [filterResults, setFilterResults] = useState({
    all: true,
    airbnb: false,
    hotels: false,
  });
  console.log(filterResults);

  // set an event handler func to set our initial state
  const filterHandler = (event) => {
    // store the event.target.value for less typing
    const isChecked = event.target.checked;
    // ... keeps all the values of our initial state object untouched
    // except for the one we want - for this we need a key and value
    // the key is in [] because it's dyanmic - it can be any of our set names
    // they help us dynamically change the key
    // the value refers to our set checked inside input
    setFilterResults({ ...filterResults, [event.target.name]: isChecked });
  };

  return airbnbResults && hotelsResults ? (
    <Wrapper>
      <PlanningDiv>
        <PlanningBar />
      </PlanningDiv>
      <ResultsDiv>
        <CardsDiv>
          <FilterDiv>
            {/* checked sets if the radio button is checked or not - accepts a boolean value */}
            <input
              // style={{ "border-radius": "100%" }}
              type="checkbox"
              value="ALL"
              name="all"
              checked={filterResults.all}
              onChange={filterHandler}
            />
            <span>ALL</span>

            <input
              type="checkbox"
              value="Airbnb"
              name="airbnb"
              checked={filterResults.airbnb}
              onChange={filterHandler}
            />
            <span>Airbnb</span>

            <input
              type="checkbox"
              value="Hotels"
              name="hotels"
              checked={filterResults.hotels}
              onChange={filterHandler}
            />
            <span>Hotels</span>
          </FilterDiv>
          {/* <DetailsDiv>Hotels details</DetailsDiv> */}

          {filterResults.all &&
            airbnbResults.map((airbnb) => {
              return (
                <>
                  <Ul key={airbnb.id}>
                    <LinkCard to="/">
                      <Li>{airbnb.name}</Li>
                    </LinkCard>
                  </Ul>
                </>
              );
            })}
          {/* {filterResults.all &&
            hotelsResults.map((hotel) => {
              return (
                <>
                  <Ul>
                    <LinkCard to="/">
                      <Li>{hotel.name}</Li>
                    </LinkCard>
                  </Ul>
                </>
              );
            })} */}

          {filterResults.airbnb &&
            airbnbResults.map((airbnb) => {
              return (
                <>
                  <Ul key={airbnb.id}>
                    <LinkCard to="/">
                      <Li>{airbnb.name}</Li>
                    </LinkCard>
                  </Ul>
                </>
              );
            })}

          {filterResults.hotels &&
            hotelsResults.map((hotel) => {
              return (
                <>
                  <Ul key={hotel.geoId}>
                    <LinkCard to="/">
                      <Li>{hotel.name}</Li>
                    </LinkCard>
                  </Ul>
                </>
              );
            })}
        </CardsDiv>
        <MapDiv style={{ width: "70%", height: "75vh" }}>
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
  flex-direction: row;
  width: 100%;
  height: auto;
  align-self: flex-start;
  border-top: 1px solid var(--color-light-blue);
`;
const CardsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 70vh;
  overflow: auto;
`;
const FilterDiv = styled.div`
  padding: 20px 0 10px 20px;
`;
const DetailsDiv = styled.div`
  width: 50%;
  padding: 20px 0 10px 20px;
  color: black;
  font-weight: 400;
  font-size: 18px;
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: column wrap;
  padding: 5px 0 10px 20px;
`;
const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  height: 100px;
  border: 1px solid #d8d8d8;
  border-radius: 15px;
  padding: 20px 15px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.12);
`;
const LinkCard = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  width: 500px;
  border-radius: 15px;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 3px 0 rgba(160, 174, 217, 0.16),
      0 2px 8px 0 rgba(160, 174, 217, 0.12);
  }
`;

export default NullMap;
