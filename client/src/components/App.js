import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
const Layout = styled.div`
  min-height: 100vh;
`;

export default App;
