import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import theme from '../../styles/theme';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
`;

const styledLink = css({
  alignItems: 'center',
  background: 'none',
  backgroundColor: `${theme.colors.primary_translucent}`,
  borderRadius: '1.2rem',
  border: `1px solid ${theme.colors.tertiary}`,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '0.9rem',
  height: '2rem',
  justifyContent: 'center',
  margin: '0.2rem',
  minWidth: '7rem',
  textDecoration: 'none',

  '&:hover': {
    boxShadow: '0 0 4px white'
  },

  '&:active': {
    backgroundColor: `${theme.colors.cuaternary}`
  }
});

function BottomNavigation() {
  const history = useHistory();
  const onClickHandler = () => {
    history.goBack();
  };

  return (
    <NavContainer>
      <Link to="/" css={styledLink}>Home</Link>
      <button type="button" to="/resources" css={styledLink} onClick={onClickHandler}>Go Back</button>
    </NavContainer>
  );
}

export default BottomNavigation;
