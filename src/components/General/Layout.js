import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Layout = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Layout;
