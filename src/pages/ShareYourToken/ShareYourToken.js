import React, { useRef } from 'react';
import { StyledForm, ReadOnlyInput, StyledP } from './elements';
import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

function ShareYourToken(props) {
  let sharedUserToken = localStorage.getItem('userToken');
  const { enqueueSnackbar } = useSnackbar();

  const inputRef = useRef(null);
  function copyData() {
    navigator.clipboard.writeText(inputRef.current.value);
    if (navigator.clipboard.writeText) {
      enqueueSnackbar('Successfully copied!', {
        variant: 'success',
      });
    }
  }

  return (
    <>
      <StyledForm>
        <Typography variant="h2">Share your list</Typography>
        <StyledP>
          <Typography variant="p">
            Copy the token below to share your shopping list with others:
          </Typography>
        </StyledP>

        <ReadOnlyInput value={sharedUserToken} ref={inputRef} readOnly />
        {document.queryCommandSupported('copy') && (
          <Button
            color="secondary"
            onClick={copyData}
            type="button"
            variant="contained"
          >
            COPY
          </Button>
        )}
      </StyledForm>
    </>
  );
}

export default ShareYourToken;
