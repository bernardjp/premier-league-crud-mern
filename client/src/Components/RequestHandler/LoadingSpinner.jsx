import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spinParams = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 5em;
  height: 5em;
  border: 2em solid ${props => props.theme.colors.tertiary_translucent};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spinParams} 1s linear infinite;
  margin-bottom: 7rem;
`;

export default LoadingSpinner;
