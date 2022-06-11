import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Copyright>© 2022 okdiego® - All rights reserved{""}</Copyright>
      <FootNav>
        <Button>Terms of use</Button>
        <Button>Privacy policy</Button>
        <Button>Blog</Button>
        <Button>About</Button>
        <Button>Contact us</Button>
      </FootNav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 60px;
  background-color: #000;
  margin: 0 auto;
  font-size: 0.9rem;
  color: #4d4f50;
`;

const Copyright = styled.div`
  padding-left: 50px;
`;

const FootNav = styled.div`
  padding-right: 50px;
`;

const Button = styled.button`
  padding: 0 25px 0 25px;
  font-family: sans-serif;
  font-size: 1em;
  color: gray;
  background: none;
  border: 0;
  height: 25px;
  :hover {
    color: #b0b1b1;
    cursor: pointer;
  }
`;

export default Footer;
