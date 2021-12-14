import React from 'react';
import PropTypes from 'prop-types';
import { ResourceInfoEntry } from './ResourceInfoEntry';
import { ResourceInfoContainer, ResourceMainInfoContainer } from './ResourceInfoContainer';
import ResourceInfoTitle from './ResourceInfoTitle';
import { CardListContainer } from './CardListContainer';
import useDocTitle from '../../Hooks/useDocTitle';

CompetitionDetail.propTypes = {
  data: PropTypes.shape({
    resourceData: PropTypes.shape({
      __v: PropTypes.number,
      competition: PropTypes.shape({
        _id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        plan: PropTypes.string,
        area: PropTypes.shape({
          name: PropTypes.string
        })
      }),
      clubList: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired
};

function CompetitionDetail({ data }) {
  const {
    // eslint-disable-next-line no-unused-vars
    __v,
    competition,
    clubList
  } = data.resourceData;

  useDocTitle(`${competition.name} info page`);

  return (
    <>
      <ResourceInfoContainer id={competition._id}>
        <ResourceMainInfoContainer>
          <ResourceInfoTitle
            name={competition.name}
            id={competition._id}
            lastUpdated={null}
            resourceType="competitions"
            // onDeleteHandler={onDeleteHandler}
          />
          <div>
            <ResourceInfoEntry label="CODE" info={competition.code} />
            <ResourceInfoEntry label="REGION" info={competition.area.name} />
            <ResourceInfoEntry label="TIER" info={competition.plan.split('_')[1]} hideLine={true} />
          </div>
        </ResourceMainInfoContainer>
      </ResourceInfoContainer>
      <CardListContainer type="clubs" info={clubList} />
    </>
  );
}

export default CompetitionDetail;
