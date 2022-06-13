import styled from "styled-components";
import LoginButton from "../common/LoginButton";
import LogoutButton from "../common/LogoutButton";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <LinkLogo to="/">
        <LogoType>
          Simple <Span>Stay</Span>
        </LogoType>
      </LinkLogo>
      {isAuthenticated && (
        <UserDiv>
          Hello<UserProfile to="/profile">{user.name}</UserProfile>
        </UserDiv>
      )}
      {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--color-light-blue);
  padding: 20px;
  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); */
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
const UserDiv = styled.div`
  display: flex;
  align-self: center;
  margin-left: 75vw;
  font-weight: 600;
`;
const UserProfile = styled(LinkLogo)`
  padding-left: 5px;
`;

export default Header;
