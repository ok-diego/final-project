import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { SimpleContext } from "../SimpleContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const {
    airbnbResults,
    hotelsResults,
    selectedAirbnb,
    setSelectedAirbnb,
    selectedHotel,
    setSelectedHotel,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    userReservation,
    setUserReservation,
  } = useContext(SimpleContext);

  const reservationIdLocStorage = localStorage.getItem("reservationId");

  useEffect(() => {
    fetch(`/user-reservation/${reservationIdLocStorage}`)
      .then((res) => res.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setUserReservation(parsedResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isAuthenticated) {
    console.log(user);
    // request backend to verify if user exist in mongoDB
  }
  console.log(userReservation);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        {/* <img src={user.picture} alt={user.name} /> */}
        <h3>Hello {user.nickname}!</h3>
        <Email>{user.email}</Email>
        {/* <div>{user.sub}</div> */}
        {/* <DetailsDiv>
          <TextRes>Reservations</TextRes>
          <TextName>{userReservation.name}</TextName>
          <TextAddress>
            <SpanBold></SpanBold> {userReservation.address}
          </TextAddress>
          <TextType>
            <SpanBold>Type:</SpanBold> {userReservation.type}
          </TextType>
          <TextBedroom>
            <SpanBold>Bedrooms:</SpanBold> {userReservation.bedrooms}
          </TextBedroom>
        </DetailsDiv> */}
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 20vh;
`;
const Email = styled.div`
  padding-top: 20px;
`;
const DetailsDiv = styled.div`
  align-items: flex-start;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 15px;
  padding: 20px 0;
`;
const TextRes = styled.div`
  align-self: flex-start;
  color: var(--color-primary);
  font-weight: 400;
  padding: 40px 0 0 0;
`;
const TextName = styled.div`
  align-self: flex-start;
  color: var(--color-primary);
  font-weight: 400;
  padding: 10px 0 0 0;
`;
const TextAddress = styled.div`
  color: var(--color-dark-green);
  padding: 10px 0 5px 0;
`;
const TextType = styled.div`
  color: black;
  padding: 5px 0;
`;
const TextBedroom = styled.div`
  color: black;
  padding: 5px 0;
`;
const SpanBold = styled.span`
  font-weight: 600;
`;

export default Profile;
