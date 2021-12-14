import styled from '@emotion/styled';

const PageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  padding-bottom: 3.5rem;
  padding-top: 10rem;
  width: 90%;

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    padding-top: 7rem;
  }
`;

export default PageContainer;
