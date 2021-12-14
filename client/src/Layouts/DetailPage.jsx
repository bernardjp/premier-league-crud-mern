import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RequestHandler from '../Components/RequestHandler/RequestHandler';
import CompetitionDetail from '../Components/DetailPage/CompetitionDetail';
import PlayerDetail from '../Components/DetailPage/PlayerDetail';
import ClubDetail from '../Components/DetailPage/ClubDetail';
import useFetch from '../Hooks/useFetch';
import fetchAPI from '../utils/fetchAPI';
import PageContainer from './BasePage';
import BottomNavigation from '../Components/Pagination/BottomNavigation';

const getComponent = type => {
  switch (type) {
    case 'players':
      return PlayerDetail;
    case 'clubs':
      return ClubDetail;
    case 'competitions':
      return CompetitionDetail;
    default:
      return null;
  }
};

DetailPage.propTypes = {
  type: PropTypes.string.isRequired
};

function DetailPage({ type: resourceType }) {
  const query = useParams().id;
  const queryParams = useRef({ resourceType, query });

  const { loading, data, error } = useFetch(fetchAPI.getResourceDetails, queryParams.current);
  return (
    <PageContainer>
      <RequestHandler
        isLoading={loading}
        data={data}
        error={error}
        Component={getComponent(resourceType)}
      />
      <BottomNavigation />
    </PageContainer>
  );
}

export default DetailPage;
