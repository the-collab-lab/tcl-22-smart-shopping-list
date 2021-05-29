import styled from 'styled-components';
import { primary } from '../../components/index';

export const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ReadOnlyInput = styled.input`
  box-sizing: border-box;
  padding: 18.5px 14px;
  box-shadow: none;
  outline: none;
  border: 1px solid rgb(192, 192, 191);
  border-radius: 4px;
  background: transparent;
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;

  &:focus,
  &:active,
  &:focus-visible {
    outline: none !important;
    border: 2px solid ${primary.main};
  }
`;

export const InputWrapper = styled.div`
  min-height: 58px;
  margin-bottom: 10px;
`;
