import React from 'react';
import styled from 'styled-components';
import BackgroundIcons from '../../backgroundIcons.svg';
import { Logo } from '../index';

const StyledMain = styled.main`
  background-image: url(${BackgroundIcons});
  min-height: 100%;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: min-content;
  padding: 12px 0 9px 0;
  background: #5f9645;
  text-align: center;

  .logo {
    height: 3.125vw;
  }
`;

const StyledDiv = styled.div`
  max-width: 1170px;
  padding: 4.5em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Layout = ({ children }) => {
  return (
    <StyledMain>
      <StyledHeader>
        <div className="logo">
          <Logo type="still" />
        </div>
      </StyledHeader>
      <StyledDiv>{children}</StyledDiv>
    </StyledMain>
  );
};

export default Layout;
