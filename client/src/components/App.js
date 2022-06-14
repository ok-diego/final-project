import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Profile from "./Profile";
import Reservation from "./Reservation";
import Error from "./Error";
import Footer from "./Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/reservation/:type/:reservationId"
            element={<Reservation />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}
const Layout = styled.div`
  min-height: calc(100vh - 180px);
`;

export default App;
