import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Reservation = () => {
  const { type, reservationId } = useParams();
  console.log(type, reservationId);

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  // declare request body object
  const requestBody = {
    email: user.email,
    // push the type and reservation id in the user reservation array in mongodb
    reservation: { type, reservationId },
  };

  const handleSubmitReservation = (ev) => {
    ev.preventDefault();
    console.log({ requestBody });

    const requestObj = {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/user-reservation", requestObj)
      .then((res) => res.json())
      .then((parsedResponse) => console.log(parsedResponse))
      .catch((err) => console.log(err));

    // try {
    //   fetch("/user-reservation", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(requestBody),
    //   })
    //     .then((res) => res.json())
    //     .then((response) => {
    //       console.log("Hi", response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // setStatus('error');
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Wrapper>
      <div>Reservation</div>
      <button
        onClick={(ev) => {
          handleSubmitReservation(ev);
        }}
      >
        Confirm
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default Reservation;
