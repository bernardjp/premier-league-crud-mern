import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

const setBackgroundToCurrentPageBtn = isCurrent => (
  isCurrent ? theme.colors.cuaternary : theme.colors.tertiary_translucent
);

const PaginationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 2rem 0 3rem 0;
  width: 100%;
  transition: 0.5s;
  
  @media (max-width: ${props => props.theme.media_queries.sm}) {
    transform: scale(0.8);
  }

  @media (max-width: ${props => props.theme.media_queries.xsm}) {
    transform: scale(0.8);
    flex-direction: column;
  }
`;

const PaginationNav = styled.div`
  display: flex;
  align-items: baseline;
`;

const PaginationButton = styled.button`
  background-color: ${props => setBackgroundToCurrentPageBtn(props.isCurrent)};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.tertiary};
  color: white;
  cursor: pointer;
  font-size: 1.05rem;
  height: 2.5rem;
  margin: 0.1rem;
  padding: 0.5rem;
  text-align: center;
  width: 2.5rem;
  transition: 0.1s;

  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
    transform: scale(1.15);
  }
`;

const PaginationEmptyButton = styled.div`
  align-items: center;
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 1.05rem;
  height: 1.5rem;
  justify-content: center;
  margin: 0.1rem;
  text-align: center;
  width: 1.5rem;
`;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageChangeHandler: PropTypes.func.isRequired
};

function Pagination({ currentPage, totalPages, pageChangeHandler }) {
  const numberedPages = new Array(totalPages).fill(null).map((n, i) => i + 1);

  const previousPageHandler = useCallback(
    () => pageChangeHandler(currentPage - 1),
    [pageChangeHandler, currentPage]
  );

  const nextPageHandler = useCallback(
    () => pageChangeHandler(currentPage + 1),
    [pageChangeHandler, currentPage]
  );

  const goToPageHandler = useCallback(
    e => pageChangeHandler(parseInt(e.target.value)),
    [pageChangeHandler]
  );

  return (
    <PaginationContainer>
      <PaginationNav>
        {currentPage > 1 && (
          <PaginationButton onClick={previousPageHandler}>
            {'<'}
          </PaginationButton>
        )}
        {currentPage >= 3 && (
          <PaginationButton value={1} onClick={goToPageHandler}>
            1
          </PaginationButton>
        )}
      </PaginationNav>
      <PaginationNav>
        {totalPages > 1 && numberedPages.map(page => {
          if (Math.abs(page - currentPage) > 2) return;
          if (Math.abs(page - currentPage) > 1) {
            return (
              <PaginationEmptyButton key={page}>
                ...
              </PaginationEmptyButton>
            );
          }

          return (
            <PaginationButton
              key={page}
              value={page}
              isCurrent={page === currentPage}
              onClick={goToPageHandler}
            >
              {page}
            </PaginationButton>
          );
        })}
      </PaginationNav>
      <PaginationNav>
        {currentPage <= (totalPages - 3) && (
          <PaginationButton value={totalPages} onClick={goToPageHandler}>
            {totalPages}
          </PaginationButton>
        )}
        {currentPage !== totalPages && (
          <PaginationButton onClick={nextPageHandler}>
            {'>'}
          </PaginationButton>
        )}
      </PaginationNav>
    </PaginationContainer>
  );
}

export default Pagination;
