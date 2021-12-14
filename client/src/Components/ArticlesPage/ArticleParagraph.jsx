// import React from 'react';
import { Link } from 'react-router-dom';

/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import theme from '../../styles/theme';

const StyledParagraph = styled.p`
  color: white;
  font-size: 0.9rem;
  margin-top: 0;
  text-align: 
`;

const LinksContainer = styled.div`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: space-evenly;
  margin: 1rem 0;
  width: 100%;

  @media (max-width: ${props => props.theme.media_queries.sm}) {
    flex-direction: column;
  }
`;

const StyledImageLink = styled.a`
  align-items: center;
  color: ${props => props.theme.colors.secondary};
  display: flex;
  font-size: 1.5rem;
  margin: 1rem;
  text-decoration: none;
`;

const StyledImage = styled.img`
  filter: ${props => props.theme.colors.secondary_filter};
  margin: 0 1rem;
`;

const styledTextLink = css({
  color: theme.colors.secondary,
  fontSize: '1.15rem',
  fontWeight: 'bold',
  textDecoration: 'none'
});

const printTextAndLinks = (text, pageInfo, j) => {
  const urlFlag = pageInfo.url;
  const pathnameFlag = pageInfo.path;

  if (text.includes(pathnameFlag)) {
    const linkText = text.split(pathnameFlag);
    return <Link css={styledTextLink} key={`p-${j}`} to={linkText[1]}>{linkText[0]}</Link>;
  }

  if (text.includes(urlFlag)) {
    const linkText = text.split(urlFlag);
    return <a css={styledTextLink} key={`u-${j}`} href={linkText[1]} target="_blank" rel="noreferrer">{linkText[0]}</a>;
  }

  return text;
};

export const printParagraphWithLinks = (string, pageInfo, i) => {
  const textChunk = string.split(pageInfo.anchor);

  if (textChunk.length > 1) {
    return (
      <StyledParagraph key={i}>
        {textChunk.map((chunk, j) => printTextAndLinks(chunk, pageInfo, j))}
      </StyledParagraph>
    );
  }

  return <StyledParagraph key={i}>{textChunk[0]}</StyledParagraph>;
};

export const printLinks = links => (
  <LinksContainer>
    {links.map(link => (
      <StyledImageLink key={link.url} href={link.url} target="_blank" rel="noreferrer">
        <StyledImage src={`/assets/${link.imgSrc}`} alt="link-img" />
        <span>{link.name}</span>
      </StyledImageLink>
    ))}
  </LinksContainer>
);
