import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { ResourceInfoEntry, ResourceInfoName } from '../DetailPage/ResourceInfoEntry';

const ListItemWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};
  display: flex;
  margin-bottom: 0.5rem;
  transition: 0.1s;
  width: 100%;
  box-shadow: 10px 10px 10px rgba(21, 0, 24, 0.1);

  &:hover {
    box-shadow: 0 0 3px ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary_translucent};
    transform: scale(1.01);
  }

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    flex-direction: column;
  }
`;

export const ListItemInfoContainer = styled(Link)`
  align-items: center;
  background-color: ${props => props.theme.colors.primary_translucent};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.tertiary_translucent};
  color: ${props => props.theme.colors.secondary};
  padding: 1rem;
  text-decoration: none;
  transition: 0.1s;
  width: 100%;

  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr auto;

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    grid-template-columns: 1fr;
    width: auto;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ListItemActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    display: none;
  }
`;

const ButtonImage = styled.img`
  height: 1.3rem;
  filter: ${props => props.theme.colors.secondary_filter};
`;

const ItemImage = styled.img`
  height: 4rem;
  margin-right: 1rem;
`;

const actionButton = css({
  alignItems: 'center',
  backgroundColor: theme.colors.tertiary_translucent,
  border: `1px solid ${theme.colors.tertiary_translucent}`,
  cursor: 'pointer',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: theme.colors.tertiary
  },
  '&:hover img': {
    filter: 'invert(1)'
  }
});

ListItem.propTypes = {
  resourceData: PropTypes.shape({
    crestUrl: PropTypes.string,
    _id: PropTypes.number,
    name: PropTypes.string,
    tla: PropTypes.string,
    venue: PropTypes.string,
    club: PropTypes.shape({
      name: PropTypes.string
    }),
    position: PropTypes.string
  }).isRequired,
  resourceType: PropTypes.oneOf(['clubs', 'players', 'competitions']).isRequired,
  onDeleteHandler: PropTypes.func.isRequired
};

export function ListItem({ resourceData, resourceType, onDeleteHandler }) {
  return (
    <ListItemWrapper>
      <ListItemInfoContainer
        to={`/resources/${resourceType}/${resourceData._id}`}
        data-resource-type={resourceType}
      >
        <NameWrapper>
          {resourceType === 'clubs'
            ? (
              <ItemImage
                src={resourceData.crestUrl
                  ? `${import.meta.env.VITE_STATIC_ASSETS_PATH}/${resourceData.crestUrl}`
                  : `${import.meta.env.VITE_STATIC_ASSETS_PATH}/Premier_League_logo.png`}
                alt={resourceData.crestUrl
                  ? `${resourceData.name} crest`
                  : 'Premier League crest'}
              />
            )
            : (
              <ItemImage
                src={`${import.meta.env.VITE_STATIC_ASSETS_PATH}/Premier_League_logo.png`}
                alt="Premier League crest"
              />
            )}
          <ResourceInfoName name={resourceData.name} />
        </NameWrapper>
        {resourceType === 'clubs'
          ? (
            <div>
              <ResourceInfoEntry label="TLA" info={resourceData.tla} isCardInfo={true} hideLine={true} />
              <ResourceInfoEntry label="VENUE" info={resourceData.venue} isCardInfo={true} hideLine={true} />
            </div>
          )
          : (
            <div>
              <ResourceInfoEntry label="CURRENT CLUB" info={resourceData.club.name || 'Free Agent'} isCardInfo={true} hideLine={true} />
              <ResourceInfoEntry label="POSITION" info={resourceData.position || 'Coaching'} isCardInfo={true} hideLine={true} />
            </div>
          )}
      </ListItemInfoContainer>
      <ListItemActionContainer>
        <button
          type="button"
          css={actionButton}
          onClick={e => onDeleteHandler(e, resourceData._id, resourceType)}
        >
          <ButtonImage src="/assets/icon_delete.png" alt="delete-button" />
        </button>
        <Link css={actionButton} to={`/resources/${resourceType}/update/${resourceData._id}`}>
          <ButtonImage src="/assets/icon_edit.png" alt="edit-button" />
        </Link>
      </ListItemActionContainer>
    </ListItemWrapper>
  );
}
