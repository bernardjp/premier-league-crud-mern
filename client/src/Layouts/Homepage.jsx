import React from 'react';
import styled from '@emotion/styled';
import LandingSection from '../Components/HomePage/LandingSection';
import SubSection from '../Components/HomePage/SubSection';
import useDocTitle from '../Hooks/useDocTitle';
import { homePageText } from '../Articles/articlePageText';

const LandingPageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  padding-bottom: 3.5rem;
  width: 90%;
`;

function Homepage() {
  useDocTitle(homePageText.docTitle);

  return (
    <LandingPageContainer>
      <LandingSection title={homePageText.title} text={homePageText.text} />
      <SubSection section={homePageText.subSection} />
    </LandingPageContainer>
  );
}

export default Homepage;
