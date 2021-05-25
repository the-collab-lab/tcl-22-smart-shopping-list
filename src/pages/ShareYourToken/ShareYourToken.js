import React, { useRef } from 'react';
import { StyledForm, ReadOnlyInput } from './elements';
import { Button } from '@material-ui/core';
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
        <h2>Share your list</h2>
        <p>Copy the token below to share your shopping list with others:</p>

        <ReadOnlyInput value={sharedUserToken} readOnly={true} ref={inputRef} />
        {document.queryCommandSupported('copy') && (
          <Button
            color="primary"
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
