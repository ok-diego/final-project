import styled from "styled-components";
import LoginButton from "../common/LoginButton";
import LogoutButton from "../common/LogoutButton";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <LinkLogo to="/">
        <LogoType>
          Simple <Span>Stay</Span>
        </LogoType>
      </LinkLogo>
      {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--color-light-blue);
  padding: 20px;
`;
const LogoType = styled.div`
  padding: 10px;
  font-weight: 400;
  font-size: 1.2rem;
`;
const Span = styled.span`
  font-weight: 300;
`;
const LinkLogo = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export default Header;
