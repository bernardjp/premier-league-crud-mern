import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { InfoCard, NewResourceCard } from './InfoCard';

const ListContainer = styled.section`
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  max-width: 100%;
  padding: 1rem;
  width: 100%;

  @media (max-width: ${props => props.theme.media_queries.xsm}) {
    justify-content: center;
  }
`;

export const ListTitleFrame = styled.h2`
  background-color: ${props => props.theme.colors.primary_translucent};
  border: 2px solid ${props => props.theme.colors.cuaternary};
  border-radius: 3px;
  color: ${props => props.theme.colors.cuaternary};
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  margin: 0;
  overflow-wrap: anywhere;
  padding: 0.5rem 1rem;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    font-size: 2rem;
  }
`;

CardListContainer.propTypes = {
  type: PropTypes.oneOf(['competitions', 'clubs', 'squad']).isRequired,
  info: PropTypes.arrayOf(PropTypes.object).isRequired
};

export function CardListContainer({ type, info }) {
  return (
    <ListContainer>
      {type === 'competitions' && <ListTitleFrame>COMPETITIONS</ListTitleFrame>}
      {type === 'squad' && <ListTitleFrame>SQUAD LINEUP</ListTitleFrame>}
      {type === 'clubs' && <ListTitleFrame>ACTIVE CLUBS</ListTitleFrame>}
      {info.map(resourceInfo => (
        <InfoCard
          key={resourceInfo._id}
          info={resourceInfo}
          resourceType={type}
        />
      ))}
      {type === 'squad' && <NewResourceCard resourceType="players" />}
    </ListContainer>
  );
}
