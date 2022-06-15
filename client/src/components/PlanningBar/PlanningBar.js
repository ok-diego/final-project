import styled from "styled-components";
import { useContext, useState } from "react";
import { SimpleContext } from "../SimpleContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  ListSubheader,
  InputLabel,
  FormControl,
} from "@mui/material";

const PlanningBar = () => {
  const {
    destination,
    setDestination,
    date,
    setDate,
    airbnbResults,
    setAirbnbResults,
    hotelsResults,
    setHotelsResults,
  } = useContext(SimpleContext);

  const [userInput, setUserInput] = useState("");
  // date picker states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // modal dialog states
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [guests, setGuests] = useState(1);

  // setDestination(userInput);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setClose(true);
  };

  // date formatting for airbnb fetch query
  // const formatStartDate = (date) => {
  //   if (!date) return "";

  //   // date object index starts at 0 for months - so we add 1 for january
  //   let month = 1 + date.getMonth();

  //   // months before 10 only display one number - so we add 0 before it
  //   if (month < 10) {
  //     month = "0" + month;
  //   }

  //   if (date) {
  //     return `${date.getFullYear()}-${month}-${date.getDate()}`;
  //   }
  // };

  // const formatEndDate = (date) => {
  //   if (!date) return "";

  //   // date object index starts at 0 for months - so we add 1 for january
  //   let month = 1 + date.getMonth();

  //   if (month < 10) {
  //     month = "0" + month;
  //   }

  //   if (date) {
  //     return `${date.getFullYear()}-${month}-${date.getDate()}`;
  //   }
  // };

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
        const codedResults = [];
        data.suggestions[1].entities.forEach((hotel) => {
          codedResults.push({ ...hotel, price: "$100" });
        });
        // we're passing 1 because we want hotels only
        setHotelsResults(codedResults);
        console.log(data.suggestions[1].entities);
        setUserInput("");
        setStartDate(null);
        setEndDate(null);
        setGuests(1);
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
      <TextDiv>Where to stay</TextDiv>

      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
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
              //   size="small"
              value={userInput}
              placeholder="Enter destination"
              onChange={(event) => {
                setUserInput(event.target.value);
                // console.log(userInput);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start date:"
                mask="____/__/__"
                inputFormat="yyyy/MM/dd"
                size="small"
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
                // size="small"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/* <FormControl
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
            </FormControl> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="grouped-select">Guests</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Guests"
                // size="small"
                value={guests}
                onChange={(event) => {
                  setGuests(event.target.value);
                }}
              >
                <MenuItem value="">{/* <em>1</em> */}</MenuItem>
                <ListSubheader>Adults</ListSubheader>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <ListSubheader>Children</ListSubheader>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Fieldset>
        <Button type="submit" value="destinations">
          Search
        </Button>
      </Form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 70vw;
  padding: 20px 0;
`;
const TextDiv = styled.div`
  color: black;
  padding: 20px 0;
  font-weight: 400;
  font-size: 18px;
`;
const Button = styled.button`
  text-decoration: none;
  color: white;
  margin-top: 0;
  font-weight: 400;
  padding: 10px 25px;
  margin-left: 5px;
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
const Form = styled.form`
  display: flex;
  align-items: center;
`;
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
  padding: 10px 30px;
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

export default PlanningBar;
