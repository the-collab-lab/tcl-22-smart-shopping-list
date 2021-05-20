import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { primary } from '../../globalStyles';

export const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  background: ${primary.dark};
`;
