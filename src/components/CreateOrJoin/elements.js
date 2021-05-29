import styled, { keyframes } from 'styled-components';

export const StyledWrapper = styled.div`
  display: block;
  margin: 1em auto;
`;

const draw = keyframes`
  from {
    stroke-dashoffset: 275;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const LogoWrapper = styled.div`
  width: 100%;

  .outline {
    stroke-dasharray: 275, 280;
    stroke-dashoffset: 275;
    animation: 2s 1s ease-in-out ${draw} forwards;
  }

  .cap {
    opacity: 0;
    animation: 0.3s 1.85s ease-in-out ${appear} forwards;
  }

  .body {
    opacity: 0;
    animation: 0.3s 3s ease-in-out ${appear} forwards;
  }

  .face {
    opacity: 0;
    animation: 0.3s 3.5s ease-in-out ${appear} forwards;
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
