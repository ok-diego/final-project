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
      <HelpContainer>
        <Copyright>© 2022 okdiego® - All rights reserved</Copyright>
        <HelpUl>
          <li>
            <LinkLogo to="/">
              <LogoType>
                Simple <Span>Stay</Span>
              </LogoType>
            </LinkLogo>
          </li>
          <li>
            <LinkLogo to="/">
              <Div>Blog</Div>
            </LinkLogo>
          </li>
          <li>
            <LinkLogo to="/">
              <Div>About</Div>
            </LinkLogo>
          </li>
          <li>
            <LinkLogo to="/">
              <Div>Terms of use</Div>
            </LinkLogo>
          </li>
          <li>
            <LinkLogo to="/">
              <Div>Contact us</Div>
            </LinkLogo>
          </li>
        </HelpUl>
      </HelpContainer>
      <SocialUl>
        <Li>
          <GrFacebookOption />
        </Li>
        <Li>
          <GrTwitter />
        </Li>
        <Li>
          <GrInstagram />
        </Li>
        <Li>
          <GrYoutube />
        </Li>
      </SocialUl>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: sticky; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  min-height: 120px;
  background-color: #000;
  font-size: 0.9rem;
  color: gray;
`;
const HelpContainer = styled.div`
  display: flex;
`;
const Copyright = styled.div`
  align-self: flex-start;
  padding: 20px 0 0 20px;
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
const Div = styled.div`
  padding: 10px 25px 0 0;
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
const HelpUl = styled.ul`
  padding: 20px 100px;
`;
const SocialUl = styled.ul`
  display: flex;
  align-items: flex-start;
  align-self: flex-start;
  padding: 20px 200px 0 0;
`;
const Li = styled.li`
  padding: 10px 11px;
  margin: 0 5px;
  border: 1px solid gray;
  border-radius: 50%;

  &:hover {
    color: #d8d8d8;
    cursor: pointer;
  }
`;

export default Footer;
