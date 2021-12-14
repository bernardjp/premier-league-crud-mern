import React from 'react';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  align-items: center;
  bottom: 0;
  color: white;
  opacity: 0.6;
  display: flex;
  font-size: 0.8rem;
  height: 3.5rem;
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 100%;
`;

const FooterText = styled.span`
  margin: 0;
  padding: 0.2rem 0 0 0;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterText>©Premier League 2021 - r/Argentina-Programa</FooterText>
    </StyledFooter>
  );
}

export default Footer;
