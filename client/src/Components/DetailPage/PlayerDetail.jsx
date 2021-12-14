import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ResourceInfoEntry } from './ResourceInfoEntry';
import { ResourceInfoContainer, ResourceMainInfoContainer } from './ResourceInfoContainer';
import ResourceInfoTitle from './ResourceInfoTitle';
import Modal from '../UtilsComponents/Modal';
import useModal from '../../Hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';
import useDocTitle from '../../Hooks/useDocTitle';

PlayerDetail.propTypes = {
  data: PropTypes.shape({
    resourceData: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      lastUpdated: PropTypes.string,
      club: PropTypes.shape({
        name: PropTypes.string
      }),
      position: PropTypes.string,
      shirtNumber: PropTypes.number,
      dateOfBirth: PropTypes.string,
      countryOfBirth: PropTypes.string,
      nationality: PropTypes.string,
      role: PropTypes.string
    })
  }).isRequired
};

function PlayerDetail({ data: { resourceData: player } }) {
  useDocTitle(`${player.name} info page`);
  const modalState = useModal();
  const resourceToDelete = useRef(null);

  // TO-DO: Logica repetida en ResourceList y ClubDetail. Logia del Modal
  const onConfirmDeletionHandler = useCallback(async () => {
    const { resourceID, resourceType } = resourceToDelete.current;

    try {
      modalState.toggleLoading(true);
      const { message } = await fetchAPI.deleteResource(resourceType, resourceID);
      modalState.toggleLoading(false);
      modalState.setMessage(message);
    } catch (err) {
      modalState.setMessage(err);
    }
  }, [resourceToDelete, modalState]);

  // TO-DO: Logica repetida en ResourceList y CLubDetail. Logia del Modal
  const onDeleteHandler = useCallback((e, resourceID, resourceType) => {
    e.preventDefault();
    resourceToDelete.current = { resourceID, resourceType };
    modalState.toggleVisibility();
  }, [player, modalState]);

  return (
    <>
      <ResourceInfoContainer id={player._id}>
        <ResourceMainInfoContainer>
          <ResourceInfoTitle
            name={player.name}
            id={player._id}
            lastUpdated={player.lastUpdated}
            resourceType="players"
            onDeleteHandler={onDeleteHandler}
          />
          <div>
            <ResourceInfoEntry label="CLUB" info={player.club.name} />
            <ResourceInfoEntry label="POSITION" info={player.position || 'Coaching'} />
            <ResourceInfoEntry label="NUMBER" info={player.shirtNumber || 'n/a'} />
          </div>
        </ResourceMainInfoContainer>
        <ResourceInfoEntry label="BIRTH" info={`${new Date(player.dateOfBirth).toLocaleDateString()}, ${player.countryOfBirth}`} />
        <ResourceInfoEntry label="NATIONALITY" info={player.nationality} />
        <ResourceInfoEntry label="ROLE" info={player.role.replace('_', ' ')} hideLine={true} />
      </ResourceInfoContainer>
      <Modal onSubmitHandler={onConfirmDeletionHandler} modalState={modalState} />
    </>
  );
}

export default PlayerDetail;
