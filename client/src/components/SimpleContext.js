import { createContext, useState } from "react";

export const SimpleContext = createContext(null);

export const SimpleProvider = ({ children }) => {
  const [state, setStae] = useState([]);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [airbnbResults, setAirbnbResults] = useState("");
  const [hotelsResults, setHotelsResults] = useState("");
  const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [userReservations, setUserReservations] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [reloadReservations, setReloadReservations] = useState(null);

  return (
    <SimpleContext.Provider
      value={{
        state,
        setStae,
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
        selectedAirbnb,
        setSelectedAirbnb,
        selectedHotel,
        setSelectedHotel,
        userReservations,
        setUserReservations,
        profileData,
        setProfileData,
        reloadReservations,
        setReloadReservations,
      }}
    >
      {children}
    </SimpleContext.Provider>
  );
};
