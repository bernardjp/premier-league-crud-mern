import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ResourceInfoEntry, ResourceInfoName } from './ResourceInfoEntry';

const InfoCardContainer = styled(Link)`
  background-color: ${props => props.theme.colors.primary_translucent};
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 0.6rem;
  transition: 0.1s;
  text-decoration: none;

  box-shadow: 10px 10px 5px rgba(21, 0, 24, 0.15);

  &:hover {
    border: 1px solid ${props => props.theme.colors.secondary_translucent};
    box-shadow: 0 0 3px ${props => props.theme.colors.secondary};
    transform: scale(1.01);
  }
`;

const NewCardLink = styled(Link)`
  align-items: center;
  background-color: ${props => props.theme.colors.primary_translucent};
  border: 2px dotted ${props => props.theme.colors.cuaternary};
  color: ${props => props.theme.colors.cuaternary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 75px;
  text-decoration: none;
  transition: 0.1s;
  width: 100%;

  &:hover {
    transform: scale(1.01);
    color: ${props => props.theme.colors.secondary};
    border: 2px solid ${props => props.theme.colors.secondary};
  }
`;

PlayerInfoCard.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.string,
    shirtNumber: PropTypes.number,
    role: PropTypes.string
  }).isRequired
};

function PlayerInfoCard({ info }) {
  return (
    <InfoCardContainer id={info._id} to={`/resources/players/${info._id}`}>
      <ResourceInfoName name={info.name} />
      <ResourceInfoEntry label="POSITION" info={info.position || 'Coaching'} hideLine={true} isCardInfo={true} />
      <ResourceInfoEntry label="NUMBER" info={info.shirtNumber || 'n/a'} hideLine={true} isCardInfo={true} />
      <ResourceInfoEntry label="ROLE" info={info.role} hideLine={true} isCardInfo={true} />
    </InfoCardContainer>
  );
}

CompetitionInfoCard.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    area: PropTypes.shape({
      name: PropTypes.string
    }),
    plan: PropTypes.string
  }).isRequired
};

function CompetitionInfoCard({ info }) {
  return (
    <InfoCardContainer id={info._id} to={`/resources/competitions/${info._id}`}>
      <ResourceInfoName name={info.name} />
      <ResourceInfoEntry label="ACRONYM" info={info.code} hideLine={true} isCardInfo={true} />
      <ResourceInfoEntry label="REGION" info={info.area.name} hideLine={true} isCardInfo={true} />
      <ResourceInfoEntry label="TIER" info={info.plan.split('_')[1]} hideLine={true} isCardInfo={true} />
    </InfoCardContainer>
  );
}

ClubInfoCard.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    tla: PropTypes.string,
    venue: PropTypes.string
  }).isRequired
};

function ClubInfoCard({ info }) {
  return (
    <InfoCardContainer id={info._id} to={`/resources/clubs/${info._id}`}>
      <ResourceInfoName name={info.name} />
      <ResourceInfoEntry label="TLA" info={info.tla} hideLine={true} isCardInfo={true} />
      <ResourceInfoEntry label="VENUE" info={info.venue} hideLine={true} isCardInfo={true} />
    </InfoCardContainer>
  );
}

NewResourceCard.propTypes = {
  resourceType: PropTypes.oneOf(['clubs', 'players', 'competitions']).isRequired
};

function NewResourceCard({ resourceType }) {
  return (
    <NewCardLink to={{ pathname: `/resources/${resourceType}/new`, state: resourceType }}>
      {resourceType === 'clubs' && 'ADD NEW CLUB'}
      {resourceType === 'players' && 'ADD NEW PLAYER'}
      {resourceType === 'competitions' && 'ADD NEW COMPETITION'}
    </NewCardLink>
  );
}

InfoCard.propTypes = {
  resourceType: PropTypes.oneOf(['clubs', 'players', 'competitions', 'squad']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  info: PropTypes.object.isRequired
};

function InfoCard({ resourceType, info }) {
  return (
    <>
      {resourceType === 'competitions' && <CompetitionInfoCard info={info} />}
      {resourceType === 'clubs' && <ClubInfoCard info={info} />}
      {resourceType === 'squad' && <PlayerInfoCard info={info} />}
    </>
  );
}

export { InfoCard, NewResourceCard };
