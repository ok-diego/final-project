import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
const Layout = styled.div`
  min-height: 100vh;
`;

export default App;
