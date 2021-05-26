import React from 'react';
import styled from 'styled-components';
import BackgroundIcons from '../../backgroundIcons.svg';

const StyledMain = styled.main`
  background-image: url(${BackgroundIcons});
  min-height: 100vh;

  .wrapper {
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
`;

const Layout = ({ children }) => {
  return (
    <StyledMain>
      <div className="wrapper">{children}</div>
    </StyledMain>
  );
};

export default Layout;
