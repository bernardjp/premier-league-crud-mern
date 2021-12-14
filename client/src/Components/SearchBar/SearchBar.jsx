import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledSearchForm = styled.form`
  max-width: 100%;
`;

const SearchBarWrapper = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  background-color: ${props => props.theme.colors.tertiary_translucent};
  border-start-start-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid ${props => props.theme.colors.tertiary};
  color: white;
  padding: 0.5rem;
  transition: 0.2s;
  width: 100%;

  &:focus {
    border: 1px solid ${props => props.theme.colors.secondary};
    outline: none;
  }
`;

const SearchButton = styled.button`
  align-items: center;
  background-color: ${props => props.theme.colors.tertiary};
  border-bottom-right-radius: 8px;
  border-start-end-radius: 8px;
  border: 1px solid ${props => props.theme.colors.tertiary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 2.2rem;
`;

const SearchFilter = styled.div`
  display: flex;
  list-style: none;
  margin-bottom: 0.3rem;
`;

const SearchFilterLabel = styled.label`
  color: white;
  margin-left: 0.75rem;
  font-weight: bold;
`;

const SearchImg = styled.img`
  height: 1rem;
  filter: invert(1);
`;

SearchBar.propTypes = {
  setQueryParams: PropTypes.func.isRequired
};

function SearchBar({ setQueryParams }) {
  const [value, setValue] = useState({ query: '', resourceType: 'clubs' });

  const submitHandler = useCallback(async submitValue => {
    setQueryParams(submitValue);
  }, [value, setQueryParams]);

  return (
    <StyledSearchForm>
      <SearchFilter>
        <SearchFilterLabel>
          CLUB
          <input
            type="radio"
            name="filter"
            id="club"
            value="clubs"
            defaultChecked={true}
            onChange={e => setValue({ ...value, resourceType: e.target.value })}
          />
        </SearchFilterLabel>
        <SearchFilterLabel>
          PLAYER
          <input
            type="radio"
            name="filter"
            id="player"
            value="players"
            onChange={e => setValue({ ...value, resourceType: e.target.value })}
          />
        </SearchFilterLabel>
      </SearchFilter>
      <SearchBarWrapper>
        <SearchInput
          onChange={e => setValue({ ...value, query: e.target.value })}
          placeholder="Search on Premier League DB"
        />
        <SearchButton
          type="submit"
          onClick={e => {
            e.preventDefault();
            submitHandler(value);
          }}
        >
          <SearchImg src="/assets/search_icon.png" alt="search-button" />
        </SearchButton>
      </SearchBarWrapper>
    </StyledSearchForm>
  );
}

export default React.memo(SearchBar);
