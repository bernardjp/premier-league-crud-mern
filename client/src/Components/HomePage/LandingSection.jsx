import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LandingSectionContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 100vh;

  @media (max-width: ${props => props.theme.media_queries.lg}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    min-height: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`;

const StyledImage = styled.img`
  margin-right: 2rem;
  max-height: 90vh;
  position: relative;
  width: 100%;

  animation-duration: 1.5s;
  animation-name: image;
  @keyframes image {
    0% { left: 1.5rem; opacity: 0.4; }
    100% { left: 0rem; opacity: 1; } 
  }

  @media (max-width: ${props => props.theme.media_queries.lg}) {
    margin-right: 0;
    max-width: 640px;
    min-width: 360px;
  }
`;

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;

  @media (max-width: ${props => props.theme.media_queries.lg}){
    margin-top: 8rem;
  }
`;

const TitleContainer = styled.div`
  bottom: -1rem;
  color: white;
  display: flex;
  flex-direction: column;
  height: max-content;
  max-width: 30rem;
  padding: 2rem;
  position: relative;

  @media (max-width: ${props => props.theme.media_queries.lg}) {
    border: 5px solid white;
  }

  & h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;

    @media (max-width: ${props => props.theme.media_queries.sm}) {
      font-size: 2.5rem;
    }
  }

  & span {
    color: #ffffffb0;
    font-size: 1.2rem;
    margin: 1rem 0;

    @media (max-width: ${props => props.theme.media_queries.sm}) {
      font-size: 1rem;
    }
  }

  & div {
    display: flex;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  align-items: center;
  background-color: white;
  border-radius: 1.2rem;
  border: 1px solid white;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-top: 1rem;
  min-width: 10rem;
  padding: 0.5rem;
  text-decoration: none;
  transition: 0.1s;
  width: fit-content;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    background-color: ${props => props.theme.colors.tertiary};
    color: white;
  }
`;

LandingSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

function LandingSection({ title, text }) {
  return (
    <LandingSectionContainer>
      <TitleWrapper>
        <TitleContainer>
          <h1>{title}</h1>
          <span>{text}</span>
          <div>
            <StyledLink to="/resources">EXPLORE NOW</StyledLink>
          </div>
        </TitleContainer>
      </TitleWrapper>
      <ImageContainer>
        <StyledImage src="/assets/salah_image.webp" alt="salah-img" />
      </ImageContainer>
    </LandingSectionContainer>
  );
}

export default LandingSection;
