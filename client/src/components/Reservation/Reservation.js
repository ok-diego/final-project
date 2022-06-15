import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useContext } from "react";
import { SimpleContext } from "../SimpleContext";
import { formatStartDate, formatEndDate } from "../common/formatDate";

const Reservation = () => {
  // setting the type and reservation id to the info(in Map file) we passed in each LinkCard
  // to the url when we click on them - see line 232 onwwards
  const { type, reservationId } = useParams();
  // console.log(type, reservationId);

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

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

  const navigate = useNavigate();

  const handleNavigateConfirmation = () => {
    navigate("/confirmation");
  };

  // set localStorage to save reservationId
  const reservationIdLocStorage = (id) => {
    localStorage.setItem("reservationId", id);
  };

  // set localStorage to save user email(id)
  const userIdLocStorage = (id) => {
    localStorage.setItem("email", id);
  };

  const handleSubmitReservation = (ev) => {
    ev.preventDefault();

    // declare request body object
    const requestBody = {
      email: user.email,
      // push the type and reservation id in the user reservation array in mongodb
      // name: airbnbnplace
      reservation: {
        type,
        reservationId,
        name: selectedAirbnb.name,
        "unit-type": selectedAirbnb.type,
        bedrooms: selectedAirbnb.bedrooms,
        address: selectedAirbnb.address,
        price: selectedAirbnb.price.priceItems[0].title,
      },
    };

    console.log({ requestBody });

    // POST request to BE
    try {
      fetch("/user-reservation", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((parsedResponse) => {
          console.log("Hi", parsedResponse);

          setUserReservation(parsedResponse.data);
          reservationIdLocStorage(parsedResponse.data.reservationId);

          if (parsedResponse.status === 201) {
            handleNavigateConfirmation();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    selectedAirbnb && (
      <Wrapper>
        <DetailsDiv>
          <TextName>{selectedAirbnb.name}</TextName>
          <TextAddress>
            <SpanBold></SpanBold> {selectedAirbnb.address}
          </TextAddress>
          <TextType>
            <SpanBold>Type:</SpanBold> {selectedAirbnb.type}
          </TextType>
          <TextBedroom>
            <SpanBold>Bedrooms:</SpanBold> {selectedAirbnb.bedrooms}
          </TextBedroom>
          <TextDate>
            <SpanBold>Check in:</SpanBold> {formatStartDate(startDate)}
          </TextDate>
          <TextDate>
            <SpanBold>Check in:</SpanBold> {formatEndDate(endDate)}
          </TextDate>
        </DetailsDiv>
        <TextCancel>
          FREE cancellation before 11:59 p.m. on Jun. 16, 2022
        </TextCancel>
        <Button
          onClick={(ev) => {
            handleSubmitReservation(ev);
          }}
        >
          Reserve for ${selectedAirbnb.price.priceItems[0].title}
        </Button>
      </Wrapper>
    )
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20vh;
`;
const DetailsDiv = styled.div`
  align-items: flex-start;
  color: var(--color-primary);
  text-decoration: none;
  border-radius: 15px;
`;
const TextName = styled.h2`
  align-self: flex-start;
  color: var(--color-primary);
  font-weight: 400;
`;
const TextAddress = styled.div`
  color: var(--color-dark-green);
  padding: 10px 0 5px 0;
`;
const TextType = styled.div`
  color: black;
  padding: 20px 0 5px 0;
`;
const TextBedroom = styled.div`
  color: black;
  padding: 5px 0;
`;
const TextDate = styled.div`
  color: black;
  padding: 5px 0;
  font-weight: 400;
`;
const SpanBold = styled.span`
  font-weight: 600;
`;
const TextCancel = styled.div`
  color: var(--color-dark-green);
  padding: 30px 0 0 0;
  font-weight: 200;
  font-size: 0.8rem;
`;
const Button = styled.button`
  align-self: center;
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 15px 35px;
  margin-top: 10px;
  font-size: 0.9rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  transition: background-color 0.2s ease-out 20ms;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

export default Reservation;
