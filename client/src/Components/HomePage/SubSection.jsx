import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ArticleTitle from '../ArticlesPage/ArticleTitle';

const StyledSectionWrapper = styled.section`
  color: white;
  width: 100%;
  margin-bottom: 2rem;
  max-width: 860px;
`;

const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoCard = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

  @media (max-width: ${props => props.theme.media_queries.md}) {
    flex-direction: column;
  }
`;

const InfoCardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 520px;
  width: 100%;

  & h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid ${props => props.theme.colors.tertiary};
    padding-bottom: 0.2rem;
    padding-right: 1rem;

    @media (max-width: ${props => props.theme.media_queries.md}) {
      text-align: center;
      padding-right: 0;
    }
  }

  & p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.75);
    padding-right: 2rem;

    @media (max-width: ${props => props.theme.media_queries.md}) {
      font-size: 1rem;
      text-align: center;
      padding-right: 0;
    }
  }
`;

const InfoCardImage = styled.img`
  max-width: 360px;
  position: relative;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 6px;
  filter: opacity(0.75);
  width: 100%;
  mask-image: linear-gradient(to top, transparent 15%, black 35%);

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const SectionTitleContainer = styled.div`
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.tertiary};
  display: flex;
  flex-direction: column;
  margin: 4rem 0 3rem 0;
  padding: 1.5rem;

  box-shadow: 10px 10px 10px rgba(21, 0, 24, 0.15);
  background-color: rgba(35, 101, 119, 0.1);
`;

SubSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    infoCards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
      })
    }))
  }).isRequired
};

function SubSection({ section }) {
  return (
    <StyledSectionWrapper>
      <SectionTitleContainer>
        <ArticleTitle text={section.title} />
        <p style={{ marginTop: '0' }}>{section.text}</p>
      </SectionTitleContainer>
      <InfoCardContainer>
        {section.infoCards.map(card => (
          <StyledInfoCard key={card.title}>
            <InfoCardText>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </InfoCardText>
            <div>
              <InfoCardImage src={card.image.src} alt={card.image.alt} />
            </div>
          </StyledInfoCard>
        ))}
      </InfoCardContainer>
    </StyledSectionWrapper>
  );
}

export default SubSection;
