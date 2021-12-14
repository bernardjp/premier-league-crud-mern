import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ListItem } from './ListItem';
import { NewResourceCard } from '../DetailPage/InfoCard';
import Pagination from '../Pagination/Pagination';
import Modal from '../UtilsComponents/Modal';
import useModal from '../../Hooks/useModal';
import fetchAPI from '../../utils/fetchAPI';

const ListWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

ResourceList.propTypes = {
  data: PropTypes.shape({
    resourceData: PropTypes.arrayOf(PropTypes.shape({
      crestUrl: PropTypes.string,
      _id: PropTypes.number,
      name: PropTypes.string,
      tla: PropTypes.string,
      venue: PropTypes.string,
      club: PropTypes.shape({
        name: PropTypes.string
      }),
      position: PropTypes.string
    })).isRequired,
    resourceType: PropTypes.oneOf(['clubs', 'players', 'competitions']).isRequired
  }).isRequired
};

function ResourceList({ data }) {
  const ITEMS_DISPLAYED = 20;
  const modalState = useModal();
  const [page, setPage] = useState(1);
  const resourceToDelete = useRef(null);
  const totalPages = Math.ceil(data.resourceData.length / ITEMS_DISPLAYED);

  // TO-DO: Logica repetida en CLubDetail y PlayerDetail
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

  // TO-DO: Logica repetida en CLubDetail y PlayerDetail
  const onDeleteHandler = useCallback((e, resourceID, resourceType) => {
    e.preventDefault();
    resourceToDelete.current = { resourceID, resourceType };
    modalState.toggleVisibility();
  }, [data, modalState]);

  const pageChangeHandler = useCallback(newPage => {
    setPage(newPage);
  }, [setPage]);

  const printListItems = useCallback(({ resourceData, resourceType }, currentPage) => {
    const filteredData = resourceData
      .slice((ITEMS_DISPLAYED * currentPage) - ITEMS_DISPLAYED, ITEMS_DISPLAYED * currentPage);

    return filteredData.map(resource => (
      <ListItem
        key={resource._id}
        resourceData={resource}
        resourceType={resourceType}
        onDeleteHandler={onDeleteHandler}
      />
    ));
  }, [data, page]);

  return (
    <>
      <ListWrapper data-resource-type={data.resourceType}>
        {data && printListItems(data, page)}
        <NewResourceCard resourceType={data.resourceType} />
      </ListWrapper>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageChangeHandler={pageChangeHandler}
      />
      <Modal onSubmitHandler={onConfirmDeletionHandler} modalState={modalState} />
    </>
  );
}

export default ResourceList;
