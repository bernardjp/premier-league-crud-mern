import styled from '@emotion/styled';

export const ResourceInfoContainer = styled.main`
  background-color: ${props => props.theme.colors.primary_translucent};
  border-radius: 4px;
  border: solid 1px ${props => props.theme.colors.tertiary_translucent};
  box-shadow: 10px 10px 5px rgba(21, 0, 24, 0.15);
  display: flex;
  flex-direction: column;
  padding-bottom: 0.4rem;
  padding: 1rem;
  width: 100%;
`;

export const ResourceMainInfoContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    display: block;
  }
`;
