import styled from "styled-components";
import { Link } from "react-router-dom";
// react icons imports
import {
  GrTwitter,
  GrFacebookOption,
  GrInstagram,
  GrYoutube,
} from "react-icons/gr";

const Footer = () => {
  return (
    <Wrapper>
      <Help>
        <Copyright>© 2022 okdiego® - All rights reserved</Copyright>
        <FooterDiv>
          <HelpUl>
            <li>
              <LinkLogo to="/">
                <LogoType>
                  Simple <Span>Stay</Span>
                </LogoType>
              </LinkLogo>
            </li>
            <li>
              <Button>Terms of use</Button>
            </li>
            {/* <li>
            <Button>Privacy policy</Button>
          </li> */}
            <li>
              <Button>Blog</Button>
            </li>
            <li>
              <Button>About</Button>
            </li>
            <li>
              <Button>Contact us</Button>
            </li>
          </HelpUl>
        </FooterDiv>
      </Help>
      <SocialUl>
        <li>
          <GrFacebookOption />
        </li>
        <li>
          <GrTwitter />
        </li>
        <li>
          <GrInstagram />
        </li>
        <li>
          <GrYoutube />
        </li>
      </SocialUl>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: sticky; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 15vh;
  background-color: #000;
  font-size: 0.9rem;
  color: gray;
`;

const Help = styled.div`
  display: flex;
`;
const Copyright = styled.div`
  align-self: flex-start;
  padding: 20px 0 0 20px;
`;

const FooterDiv = styled.div`
  padding-right: 0;
`;
const LogoType = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  color: #d8d8d8;
`;
const Span = styled.span`
  color: gray;
  font-weight: 200;
`;
const LinkLogo = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
const Button = styled.button`
  padding: 0 25px 0 25px;
  font-family: sans-serif;
  font-size: 1em;
  color: gray;
  background: none;
  border: 0;
  height: 25px;
  font-weight: 300;

  &:hover {
    color: #d8d8d8;
    cursor: pointer;
  }
`;
const ButtonSimple = styled.button`
  padding: 0 25px 0 25px;
  font-family: sans-serif;
  font-size: 1em;
  color: gray;
  background: none;
  border: 0;
  height: 25px;
  cursor: pointer;
`;
const HelpUl = styled.ul`
  padding: 20px 20px;
`;
const SocialUl = styled.ul`
  display: flex;
  align-items: flex-start;
  padding: 0;
`;

export default Footer;
