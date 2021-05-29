import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { db } from './../../lib/firebase';
import { withSnackbar } from 'notistack';
import { StyledForm, WhiteBGWrapper } from './elements';
import Logo from './../../logo.svg';

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
      <img src={Logo} alt="avoCart logo" style={{ width: '50%' }} />
      <Typography
        variant="h1"
        style={{ color: 'white', paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        Welcome to your smart shopping list!
      </Typography>
      <Typography
        variant="body1"
        style={{ color: '#F2F3F2' }}
        className="instructions"
      >
        Join an existing shopping list <br />
        by entering a three word token:
      </Typography>
      <StyledForm id="shareToken" onSubmit={onSubmitHandler}>
        <WhiteBGWrapper>
          <TextField
            id="shareToken"
            variant="outlined"
            label="Token"
            onChange={onChangeHandler}
            required
          />
        </WhiteBGWrapper>
        <WhiteBGWrapper>
          <Button color="primary" type="submit" variant="outlined">
            Join existing list
          </Button>
        </WhiteBGWrapper>
      </StyledForm>
    </>
  );
};

export default withSnackbar(ShareToken);
