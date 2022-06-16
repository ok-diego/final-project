import { useAuth0 } from "@auth0/auth0-react";
import usePersistentState from "./hooks/usePersistentState";
import { createContext, useState } from "react";
export const SimpleContext = createContext(null);

export const SimpleProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [state, setStae] = useState([]);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [airbnbResults, setAirbnbResults] = useState("");
  const [hotelsResults, setHotelsResults] = useState("");
  const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [userReservation, setUserReservation] = useState(null);
  const [userReservations, setUserReservations] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [reloadReservations, setReloadReservations] = useState(null);

  // const sub = user.sub;
  // const handleUserId = () => {
  //   if (!isAuthenticated) {
  //     return "subMe";
  //   }
  //   if (isAuthenticated) {
  //     return user.email;
  //   }
  // };

  // const [userData, setUserData] = usePersistentState("id", handleUserId());

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
        userReservation,
        setUserReservation,
        userReservations,
        setUserReservations,
        profileData,
        setProfileData,
        reloadReservations,
        setReloadReservations,
        // userData,
        // setUserData,
      }}
    >
      {children}
    </SimpleContext.Provider>
  );
};
