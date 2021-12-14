import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import useDocTitle from '../Hooks/useDocTitle';
import useFetch from '../Hooks/useFetch';
import fetchAPI from '../utils/fetchAPI';
import RequestHandler from '../Components/RequestHandler/RequestHandler';
import ResourceList from '../Components/ResourceListPage/ResourceList';
import SearchBar from '../Components/SearchBar/SearchBar';
import PageContainer from './BasePage';
import Article from '../Articles/Article';
import ArticleTitle from '../Components/ArticlesPage/ArticleTitle';
import { printParagraphWithLinks } from '../Components/ArticlesPage/ArticleParagraph';
import { resourcePageText } from '../Articles/articlePageText';

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    grid-template-columns: 1fr;
  }
`;

const SearchBarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: ${props => props.theme.media_queries.lg}) {
    grid-template-columns: 1fr;
  }
`;

function ResourceListPage() {
  const location = useLocation();
  const pageInfo = new Article(resourcePageText);
  const paragraphs = pageInfo.text.split(pageInfo.paragraph);

  const resourceType = location.pathname.split('/')[2];
  const initialState = {
    resourceType: (resourceType || 'clubs'),
    query: null
  };

  const [queryParams, setQueryParams] = useState(initialState);
  const { loading, data, error } = useFetch(fetchAPI.getResourceList, queryParams);
  useDocTitle(`${queryParams.resourceType[0].toUpperCase() + queryParams.resourceType.slice(1)} List`);

  useEffect(() => {
    setQueryParams(initialState);
  }, [location]);

  return (
    <PageContainer>
      <TitleWrapper>
        <ArticleTitle text={`${pageInfo.title} ${queryParams.resourceType.toUpperCase()}`} />
        <SearchBarWrapper>
          {paragraphs.map((string, i) => printParagraphWithLinks(string, pageInfo, i))}
          <SearchBar setQueryParams={setQueryParams} />
        </SearchBarWrapper>
      </TitleWrapper>
      <RequestHandler
        isLoading={loading}
        data={data}
        error={error}
        Component={ResourceList}
      />
    </PageContainer>
  );
}

export default ResourceListPage;
