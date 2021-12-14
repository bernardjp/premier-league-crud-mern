import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Navbar from './Navbar';
import BurgerNavMenu from './BurgerNavbar';
import navbarLinkConfig from './navbarLinksConfig';

const HeaderWrapper = styled.header`
  align-items: center;
  background-color: none;
  display: flex;
  justify-content: space-between;
  height: 3.5rem;
  position: absolute;
  top: 0;
  width: 90%;
  max-width: 1280px;

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    width: 100%;
  }
`;

const LogoLink = styled.a`
  display: flex;
  margin: 0 1rem;
`;

const LogoImage = styled.img`
  height: 2.6rem;
  filter: brightness(255);
`;

function Header() {
  const location = useLocation();
  const path = `/${location.pathname.split('/')[1]}`;
  const [currentPath, setCurrentPath] = useState(path);

  useEffect(() => {
    setCurrentPath(path);
  }, [location]);

  return (
    <HeaderWrapper>
      <LogoLink href="https://www.premierleague.com/" target="_blank">
        <LogoImage src="/assets/premier_league_logo.png" alt="PL_Logo" />
      </LogoLink>
      <Navbar navbarLinkConfig={navbarLinkConfig} currentPath={currentPath} />
      <BurgerNavMenu navbarLinkConfig={navbarLinkConfig} />
    </HeaderWrapper>
  );
}

export default Header;
