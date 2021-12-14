import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const InfoWrapper = styled.div`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: space-between;
  min-height: ${props => (props.isCardInfo ? '' : '2.5rem')};
  overflow: auto;
  padding: ${props => (props.isCardInfo ? '0' : '0 0.2rem')};
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.cuaternary};
  font-size: 0.8rem;
  font-weight: bold;
  padding-top: 0.2rem;
`;

const InfoData = styled.span`
  color: white;
  font-size: 0.9rem;
  margin-left: 0.8rem;
  text-align: end;
  padding-top: 0.2rem;
  overflow-wrap: anywhere;
`;

const InfoLink = styled.a`
  color: white;
  font-size: 0.9rem;
  margin-left: 0.8rem;
  text-align: end;
  padding-top: 0.2rem;
  overflow-wrap: anywhere;
`;

const InfoImportantData = styled.span`
  color: ${props => props.theme.colors.secondary};
  margin-left: 0.8rem;
  text-align: end;
  font-weight: bold;
  font-size: 1.1rem;
  padding-top: 0.2rem;
`;

const InfoCardTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-wrap: anywhere;
`;

const InfoCardTitle = styled.h3`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.1rem;
  margin: 0 0 0.2rem 0;
  text-align: end;
`;

const StyledHr = styled.hr`
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.tertiary_translucent};
  margin: 0.1rem 0;
  width: 100%;
`;

ResourceInfoEntry.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  hideLine: PropTypes.bool,
  isCardInfo: PropTypes.bool
};

ResourceInfoEntry.defaultProps = { info: null, isCardInfo: false, hideLine: false };

function ResourceInfoEntry({
  label, info, hideLine, isCardInfo
}) {
  return (
    <>
      <InfoWrapper isCardInfo={isCardInfo}>
        <InfoLabel>{`${label}`}</InfoLabel>
        {label === 'FULL NAME' || label === 'CLUB'
          ? <InfoImportantData>{`${info}`}</InfoImportantData>
          : <InfoData>{`${info || 'Not provided'}`}</InfoData>}
      </InfoWrapper>
      {!hideLine && <StyledHr />}
    </>
  );
}

ResourceInfoLink.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  hideLine: PropTypes.bool,
  isCardInfo: PropTypes.bool
};

ResourceInfoLink.defaultProps = { isCardInfo: false, hideLine: false };

function ResourceInfoLink({
  label, info, hideLine, isCardInfo
}) {
  return (
    <>
      <InfoWrapper isCardInfo={isCardInfo}>
        <InfoLabel>{`${label}`}</InfoLabel>
        {info
          ? <InfoLink href={`https://${info}`} target="_blank">{info}</InfoLink>
          : <InfoData>Not provided</InfoData>}
      </InfoWrapper>
      {!hideLine && <StyledHr />}
    </>
  );
}

ResourceInfoName.propTypes = {
  name: PropTypes.string.isRequired
};

function ResourceInfoName({ name }) {
  return (
    <InfoCardTitleWrapper>
      <InfoCardTitle>{name}</InfoCardTitle>
      <StyledHr />
    </InfoCardTitleWrapper>
  );
}

export { ResourceInfoEntry, ResourceInfoName, ResourceInfoLink };
