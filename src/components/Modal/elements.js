import styled from 'styled-components';

// These elements are really just associated with the DeleteModal component
// No need to make these available everywhere
// You could have a more Global elements file, as well,
// as well as use the `GlobalStyles` component from styled-components
export const StyledModalBtn = styled.button`
  font-family: Lato, sans-serif;
  display: inline-block;
  padding: 5px;
  margin: 0.5rem 1rem;
  width: 6rem;
  background: #ffc344;
  color: black;
  text-align: center;
  cursor: pointer;
  background: ;
  justify-content: center;
  border: none;
  &:hover {
    background: darkgray;
  }
`;

export const StyledModalLayout = styled.div`
  font-family: Lato, sans-serif;
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

  span {
    text-decoration: underline;
  }
`;
