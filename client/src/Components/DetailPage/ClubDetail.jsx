import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ResourceInfoEntry, ResourceInfoLink } from './ResourceInfoEntry';
import { ResourceInfoContainer, ResourceMainInfoContainer } from './ResourceInfoContainer';
import ResourceInfoTitle from './ResourceInfoTitle';
import { CardListContainer } from './CardListContainer';
import Modal from '../UtilsComponents/Modal';
import useModal from '../../Hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';
import useDocTitle from '../../Hooks/useDocTitle';

ClubDetail.propTypes = {
  data: PropTypes.shape({
    resourceData: PropTypes.shape({
      __v: PropTypes.number,
      _id: PropTypes.number,
      crestUrl: PropTypes.string,
      activeCompetitions: PropTypes.arrayOf(PropTypes.object),
      squad: PropTypes.arrayOf(PropTypes.object),
      lastUpdated: PropTypes.string,
      name: PropTypes.string,
      shortName: PropTypes.string,
      tla: PropTypes.string,
      clubColors: PropTypes.string,
      found: PropTypes.string,
      venue: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      website: PropTypes.string
    })
  }).isRequired
};

function ClubDetail({ data }) {
  const {
    __v,
    _id,
    crestUrl,
    activeCompetitions,
    squad,
    lastUpdated,
    ...clubInfo
  } = data.resourceData;

  useDocTitle(`${clubInfo.name} info page`);
  const modalState = useModal();
  const resourceToDelete = useRef(null);

  // TO-DO: Logica repetida en ResourceList y PlayerDetail
  const onConfirmDeletionHandler = useCallback(async () => {
    const { resourceID, resourceType } = resourceToDelete.current;

    try {
      modalState.toggleLoading(true);
      const { message } = await fetchAPI.deleteResource(resourceType, resourceID);
      modalState.toggleLoading(false);
      modalState.setMessage(message);
    } catch (err) {
      modalState.setMessage(err);
      console.log(err);
    }
  }, [resourceToDelete, modalState]);

  // TO-DO: Logica repetida en ResourceList y PlayerDetail
  const onDeleteHandler = useCallback((e, resourceID, resourceType) => {
    e.preventDefault();
    resourceToDelete.current = { resourceID, resourceType };
    modalState.toggleVisibility();
  }, [data, modalState]);

  return (
    <>
      <ResourceInfoContainer id={_id}>
        <ResourceMainInfoContainer>
          <ResourceInfoTitle
            name={clubInfo.shortName}
            id={_id}
            lastUpdated={lastUpdated}
            resourceType="clubs"
            onDeleteHandler={onDeleteHandler}
          />
          <div>
            <ResourceInfoEntry label="FULL NAME" info={clubInfo.name} />
            <ResourceInfoEntry label="TLA" info={clubInfo.tla} />
            <ResourceInfoEntry label="CLUB COLORS" info={clubInfo.clubColors} />
            <ResourceInfoEntry label="FOUNDED" info={clubInfo.founded} />
          </div>
        </ResourceMainInfoContainer>
        <ResourceInfoEntry label="VENUE NAME" info={clubInfo.venue} />
        <ResourceInfoEntry label="VENUE ADDRESS" info={clubInfo.address} />
        <ResourceInfoEntry label="PHONE" info={clubInfo.phone} />
        <ResourceInfoEntry label="EMAIL" info={clubInfo.email} />
        <ResourceInfoLink label="WEBSITE" info={clubInfo.website} hideLine={true} />
      </ResourceInfoContainer>
      <CardListContainer type="competitions" info={activeCompetitions} />
      <CardListContainer type="squad" info={squad} />
      <Modal onSubmitHandler={onConfirmDeletionHandler} modalState={modalState} />
    </>
  );
}

export default ClubDetail;
