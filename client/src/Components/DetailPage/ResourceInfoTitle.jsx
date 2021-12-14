import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const TitleContainer = styled.div`
  color: ${props => props.theme.colors.cuaternary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 25rem;
`;

const ResourceTitle = styled.h1`
  font-weight: bold;
  font-size: 2.8rem;
  margin: 0;
  overflow-wrap: anywhere;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  filter: ${props => props.theme.colors.cuaternary_filter};
  margin-right: 0.5rem;
  padding: 0;
`;

const UpdateButton = styled(Link)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  filter: ${props => props.theme.colors.cuaternary_filter};
  margin-right: 0.5rem;
`;

const LastUpdateText = styled.p`
  font-size: 0.8rem;
`;

ResourceInfoTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  lastUpdated: PropTypes.string,
  resourceType: PropTypes.oneOf(['clubs', 'players', 'competitions']).isRequired,
  onDeleteHandler: PropTypes.func
};

ResourceInfoTitle.defaultProps = {
  lastUpdated: null,
  onDeleteHandler: () => {}
};

function ResourceInfoTitle({
  name, id, lastUpdated, resourceType, onDeleteHandler
}) {
  return (
    <TitleContainer datatype={id}>
      <ResourceTitle>{`${name.toUpperCase()}`}</ResourceTitle>
      {lastUpdated && (
        <ActionButtonsContainer>
          <DeleteButton onClick={e => onDeleteHandler(e, id, resourceType)}>
            <img src="/assets/icon_delete.png" alt="delete-button" style={{ width: '1.3rem' }} />
          </DeleteButton>
          <UpdateButton to={`/resources/${resourceType}/update/${id}`}>
            <img src="/assets/icon_edit.png" alt="edit-button" style={{ width: '1.3rem' }} />
          </UpdateButton>
          <LastUpdateText>{`Last update: ${new Date(lastUpdated).toLocaleString()}`}</LastUpdateText>
        </ActionButtonsContainer>
      )}
    </TitleContainer>
  );
}

export default ResourceInfoTitle;
