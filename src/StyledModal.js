import styled from 'styled-components';

export const StyledModalBtn = styled.button`
  display: inline-block;
  padding: 5px;
  margin: 0.5rem 1rem;
  width: 6rem;
  background: transparent;
  color: black;
  text-align: center;
  cursor: pointer;
  background: lightgray;
  justify-content: center;
  border: none;
  &:hover {
    background: darkgray;
  }
`;

const StyledModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  background-color: white;
  padding: 6rem;
  border-radius: 5px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  max-width: 250px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default StyledModalLayout;
