import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledTitle = styled.h1`
  color: ${props => props.theme.colors.cuaternary};
  font-size: 2.5rem;
  text-align: end;
  border-bottom: 1px solid ${props => props.theme.colors.tertiary_translucent};
  margin-bottom: 1.5rem;
  margin-top: 0;
  padding-bottom: 0.75rem;
  width: 100%;
`;

ArticleTitle.propTypes = {
  text: PropTypes.string.isRequired
};

function ArticleTitle({ text }) {
  return (<StyledTitle>{text.toUpperCase()}</StyledTitle>);
}

export default ArticleTitle;
