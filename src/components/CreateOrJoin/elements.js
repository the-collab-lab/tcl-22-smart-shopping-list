import styled from 'styled-components';
import { Logo } from '../index';

export const StyledWrapper = styled.div`
  display: block;
  margin: 1em auto;
`;

export const LogoWrapper = styled.div`
  width: 100%;

  .outline {
    stroke-dasharray: 275, 280;
  }
`;

export const ButtonWrapper = styled.div`
  background-color: white;
  width: fit-content;
  border-radius: 6px;
  display: flex;
  align-content: center;
  margin: auto;
`;
