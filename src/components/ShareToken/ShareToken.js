import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db } from './../../lib/firebase';
import { withSnackbar } from 'notistack';
import { StyledForm, StyledTextField } from './elements';
import { primary } from './../../components';
import './styles.css';

const ShareToken = (props) => {
  const [shareToken, setShareToken] = useState(null);

  // 1. Make a on submit function where we pull list of collections
  const onSubmitHandler = (event) => {
    event.preventDefault();
    db.collection(shareToken)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          props.enqueueSnackbar('Incorrect token, please try again', {
            variant: 'error',
          });
        } else {
          props.enqueueSnackbar('Success', {
            variant: 'success',
          });
          props.updateToken(shareToken);
        }
      });
  };

  // 2. Create change function that keeps track of user input
  const onChangeHandler = (event) => {
    setShareToken(event.target.value);
  };

  // 3. In submit function we will compare the collections list with submitted token
  // 4a. If exists then take user to shopping list
  // 4b. If doesn't exist then notify user as such

  return (
    <>
      <h2>Welcome to your smart shopping list!</h2>
      <p>Join an existing shopping list by entering a three word token:</p>
      <StyledForm id="shareToken" onSubmit={onSubmitHandler}>
        <label htmlFor="shareToken" class="visuallyHidden">
          Share token
        </label>
        <StyledTextField
          id="shareToken"
          variant="outlined"
          onChange={onChangeHandler}
          label="Token"
          required
        />
        {/* <TextField id="shareToken" variant="outlined" onChange={onChangeHandler} label="Token" required /> */}
        <Button
          style={{ color: primary.dark, backgroundColor: 'white' }}
          size="small"
          type="submit"
          variant="contained"
        >
          Join existing list
        </Button>
      </StyledForm>
    </>
  );
};

export default withSnackbar(ShareToken);
