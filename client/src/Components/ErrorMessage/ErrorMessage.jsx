import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ErrorSpan = styled.span`
  align-items: center;
  background-color: ${props => props.theme.colors.tertiary_translucent};
  border-radius: 6px;
  border: 2px solid ${props => props.theme.colors.cuaternary};
  color: white;
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 7rem;
  padding: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    flex-direction: column;
  }
`;

const ErrorIcon = styled.img`
  height: 3rem;
  filter: ${props => props.theme.colors.cuaternary_filter};
  margin: 1rem;
`;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

function ErrorMessage({ message }) {
  return (
    <ErrorSpan>
      <ErrorIcon src="/assets/icon_alert.png" alt="error-icon" />
      {message}
    </ErrorSpan>
  );
}

export default ErrorMessage;
