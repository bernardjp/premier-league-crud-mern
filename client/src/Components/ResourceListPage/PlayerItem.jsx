// DEPRECATED: unificado con el CLubListItem y el NewListItem en un solo archivo.
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled(Link)`
  border: 1px solid tomato;
  color: black;
  margin: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  width: 90%;
`;

function PlayerItem({ playerData }) {
  return (
    <Container to={`/resources/players/${playerData._id}`}>
      <span>{playerData.name}</span>
    </Container>
  );
}

export default PlayerItem;
