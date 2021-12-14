import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Wrapper = styled.div`
  margin-top: 5rem;
`;

RequestHandler.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  error: PropTypes.objectOf(PropTypes.string),
  Component: PropTypes.elementType.isRequired
};

RequestHandler.defaultProps = {
  data: null,
  error: null
};

function RequestHandler({
  isLoading, data, error, Component
}) {
  return (
    <>
      {isLoading && <Wrapper><LoadingSpinner /></Wrapper>}
      {error && <Wrapper><ErrorMessage message={error.message} /></Wrapper>}
      {data && <Component data={data} />}
    </>
  );
}

export default React.memo(RequestHandler);
