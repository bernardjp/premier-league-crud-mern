import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BurgerNavWrapper = styled.div`
  -webkit-user-select: none;
  display: none;
  left: -1rem;
  position: relative;
  user-select: none;
  z-index: 1;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    display: block;
  }
`;

const BurgerNavCheckbox = styled.input`
  -webkit-touch-callout: none;
  cursor: pointer;
  display: block;
  height: 25px;
  opacity: 0;
  position: absolute;
  width: 25px;
  z-index: 2;
  left: -1px;
  top: -2px;
`;

const LineContainer = styled.div`
  margin-top: 5px;
`;

const BurgerNavLine = styled.span`
  display: block;
  width: 30px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: ${props => (props.isOpen ? props.theme.colors.cuaternary : props.theme.colors.secondary)};
  border-radius: 3px;
  z-index: 1;

  transform-origin: 4px 0px;

  transition: 
    transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
    opacity 0.55s ease;

  &:first-of-type {
    transform-origin: 0% 0%;
    
    transform: ${({ isOpen }) => isOpen && 'rotate(42deg) translate(1px, -2px) scaleX(1.06)'};
  }

  &:nth-last-of-type(2) {
    transform-origin: 0% 100%;
    opacity: ${({ isOpen }) => isOpen && '0'};
    transform: ${({ isOpen }) => isOpen && 'rotate(0deg) scale(0.2, 0.2)'};
  }

  &:nth-last-of-type(1) {
    transform-origin: 0% 100%;
    transform: ${({ isOpen }) => isOpen && 'rotate(-42deg) translate(1px, 2px) scaleX(1.06)'};
  }

`;

const BurgerMenu = styled.nav`
  margin-top: -0.7rem;
  padding: 3.5rem 0 0.8rem 0;
  position: absolute;
  right: -3rem;
  top: 0;
  width: 16rem;

  background: ${props => props.theme.colors.primary};
  backdrop-filter: blur(8px);
  list-style-type: none;
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};

  transform-origin: 0% 0%;
  transform: ${props => (props.isOpen ? 'none' : 'translate(100%, 0)')};

  transition: transform 0.8s cubic-bezier(0.77,0.2,0.05,1.0)
`;

const NavbarButton = styled(Link)`
  align-items: center;
  color: white;
  display: flex;
  padding: 1rem;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }

  &:active {
    background-color: ${props => props.theme.colors.cuaternary};
  }
`;

const NavbarText = styled.span`
  margin-top: 0.2rem;
  font-size: 0.9rem;
`;

BurgerButton.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

function BurgerButton({ isOpen }) {
  return (
    <LineContainer>
      <BurgerNavLine isOpen={isOpen} />
      <BurgerNavLine isOpen={isOpen} />
      <BurgerNavLine isOpen={isOpen} />
    </LineContainer>
  );
}

BurgerNavMenu.propTypes = {
  navbarLinkConfig: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired
};

function BurgerNavMenu({ navbarLinkConfig }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCheckHandler = () => {
    setMenuOpen(!isMenuOpen);
  };

  const onClickMenu = () => {
    setMenuOpen(false);
  };

  return (
    <BurgerNavWrapper>
      <BurgerNavCheckbox onClick={onCheckHandler} />
      <BurgerButton isOpen={isMenuOpen} />
      <BurgerMenu isOpen={isMenuOpen}>
        {navbarLinkConfig
          .map(link => (
            <NavbarButton
              key={link.path}
              to={link.path}
              onClick={onClickMenu}
            >
              <NavbarText>
                {link.text}
              </NavbarText>
            </NavbarButton>
          ))}
      </BurgerMenu>
    </BurgerNavWrapper>
  );
}

export default BurgerNavMenu;
