import styled from 'styled-components';
import { withStyles, TextField } from '@material-ui/core';
import { primary } from './../../components';

export const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: primary.dark,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primary.dark,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: primary.light,
      },
      '&:hover fieldset': {
        borderColor: primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: primary.main,
      },
    },
  },
})(TextField);
