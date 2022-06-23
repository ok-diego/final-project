import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SimpleContext } from "../SimpleContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import {
//   DateRangePicker,
//   DateRange,
// } from "@mui/x-date-pickers-pro/DateRangePicker";
import { formatStartDate, formatEndDate } from "../common/formatDate";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  NativeSelect,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Planning = () => {
  const {
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    airbnbResults,
    setAirbnbResults,
    hotelsResults,
    setHotelsResults,
  } = useContext(SimpleContext);

  const [userInput, setUserInput] = useState("");

  // modal dialog states
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [guests, setGuests] = useState(1);

  // date range picker state
  // const [dateValues, setDateValues] = useState([null, null]);

  // modal handler function
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setClose(true);
  };

  console.log(formatStartDate(startDate));
  console.log(formatEndDate(endDate));
  // console.log(startDate);
  // console.log(endDate);

  const handleSubmit = (event) => {
    event.preventDefault();

    // we have a local state to keep track of the user input
    // this state is always going to be one step behind because that's how they work
    // we use the state in context becuase it's updated and we have acess to the latest
    setDestination(userInput);

    // Airbnb api fetch
    const optionsAirbnb = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
        // we hide our API key in the .env file (environment variables)
        "X-RapidAPI-Key": `${process.env.REACT_APP_AIRBNB_KEY}`,
      },
    };

    fetch(
      `https://airbnb13.p.rapidapi.com/search-location?location=${userInput}&checkin=${formatStartDate(
        startDate
      )}&checkout=${formatEndDate(
        endDate
      )}&adults=${guests}&children=0&infants=0&page=1`,
      optionsAirbnb
    )
      .then((response) => response.json())
      .then((data) => {
        setAirbnbResults(data.results);
        console.log(data.results);
      })
      .catch((err) => console.error(err));

    // Hotels api fetch
    const optionsHotels = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_AIRBNB_KEY}`,
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      },
    };

    fetch(
      `https://hotels4.p.rapidapi.com/locations/v2/search?query=${userInput}&locale=en_US&currency=CAD`,
      optionsHotels
    )
      .then((response) => response.json())
      .then((data) => {
        // we're passing 1 because we want hotels only
        const codedResults = [];
        data.suggestions[1].entities.forEach((hotel) => {
          codedResults.push({ ...hotel, price: "$100" });
        });
        // we're passing 1 because we want hotels only
        setHotelsResults(codedResults);
        console.log(data.suggestions[1].entities);
        // setUserInput("");
        // setStartDate(null);
        // setEndDate(null);
        // setGuests(1);
        console.log(data.suggestions[1].entities);
      })

      .catch((err) => console.error(err));
  };

  // console.log(destination);
  // console.log(guests);
  // console.log(userInput);
  // console.log(airbnbResults);
  console.log(hotelsResults);

  return (
    <Wrapper>
      <TextDiv>
        Create your itineray from the best hotels and airbnbs available
      </TextDiv>
      <Button onClick={handleOpenModal}>Start planning!</Button>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Plan your trip</DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            // bgcolor: "#F2F2F2",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Fieldset>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  autoFocus
                  margin="dense"
                  id="destination"
                  label="Destination"
                  type="text"
                  // fullWidth
                  variant="outlined"
                  value={userInput}
                  placeholder="Enter destination"
                  onChange={(event) => {
                    setUserInput(event.target.value);
                    // console.log(userInput);
                  }}
                />
                <FormControl
                  sx={{
                    "& > :not(style)": { m: 0, width: "10ch" },
                  }}
                >
                  <InputLabel id="guests">Guests</InputLabel>
                  <Select
                    // defaultValue={1}
                    value={guests}
                    name="Guests"
                    id="guests"
                    label="guests"
                    autoWidth
                    onChange={(event) => {
                      setGuests(event.target.value);
                    }}
                  >
                    <MenuItem value="1"></MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start date:"
                    mask="____/__/__"
                    inputFormat="yyyy/MM/dd"
                    // views={["year", "month", "day"]}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End date:"
                    mask="____/__/__"
                    inputFormat="yyyy/MM/dd"
                    // views={["year", "month", "day"]}
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* date range picker - only with license suubscription */}
                {/* <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                >
                  <DateRangePicker
                    value={dateValues}
                    onChange={(newValue) => {
                      setDateValues(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider> */}
              </Box>
              <DialogActions>
                <InputSubmit
                  type="submit"
                  value="See your destinations"
                  onClick={handleCloseModal}
                />
              </DialogActions>
            </Fieldset>
          </Form>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 30vw;
  padding-top: 40px;
`;
// const TextDiv = styled.div`
//   padding: 20px 0;
//   font-weight: 400;
// `;
const TextDiv = styled.h4`
  color: white;
  padding: 20px 0;
  font-weight: 200;
`;
const Button = styled.button`
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 30px;
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
const Form = styled.form``;

const InputText = styled.input`
  width: 40%;
  /* height: 40px; */
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  padding: 18px;
  margin: 5px 0;

  &:focus {
    background-color: none;
  }

  &:hover {
    border: 1px solid black;
  }

  &:visited {
    background: none;
  }

  &::placeholder {
  }
`;

const InputSubmit = styled.input`
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 35px;
  font-size: 0.9rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  transition: background-color 0.2s ease-out 20ms;
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

const Fieldset = styled.fieldset``;

export default Planning;
