import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from './components';
import { db } from './lib/firebase';
import { withSnackbar } from 'notistack';

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
      <p>Join an existing shopping list by entering a three word token.</p>
      <form id="shareToken">
        <label htmlFor="shareToken">Share token</label>
        <TextField variant="outlined" onChange={onChangeHandler} required />
        <Button
          variant="contained"
          size="small"
          color="secondary"
          buttonText="Join an existing list"
          onClick={onSubmitHandler}
        />
      </form>
    </>
  );
};

export default withSnackbar(ShareToken);
