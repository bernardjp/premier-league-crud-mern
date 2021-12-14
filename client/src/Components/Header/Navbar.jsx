import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NavbarWrapper = styled.nav`
  display: flex;
  height: 100%;
  align-items: end;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    display: none;
  }
`;

const NavbarButton = styled(Link)`
  align-items: center;
  color: white;
  display: flex;
  text-decoration: none;

  border: 1px solid ${props => (props.current === 'true' ? props.theme.colors.tertiary : 'transparent')};
  border-radius: 1rem;
  height: 2rem;
  min-width: 5rem;
  justify-content: center;
  margin: 0 0.3rem;
  padding: 0 0.5rem;

  &:active {
    background-color: white;
    color: ${props => props.theme.colors.tertiary};
  }
`;

const NavbarText = styled.span`
  font-size: 0.9rem;
`;

Navbar.propTypes = {
  navbarLinkConfig: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    path: PropTypes.string
  })).isRequired,
  currentPath: PropTypes.string.isRequired
};

function Navbar({ navbarLinkConfig, currentPath }) {
  return (
    <NavbarWrapper>
      {navbarLinkConfig.map(link => {
        const isCurrent = currentPath === link.path;
        return (
          <NavbarButton
            key={link.path}
            to={link.path}
            current={isCurrent.toString()}
          >
            <NavbarText>
              {link.text}
            </NavbarText>
          </NavbarButton>
        );
      })}
    </NavbarWrapper>
  );
}

export default Navbar;
