import React, { useState } from 'react';
import { db } from './lib/firebase';
import { useHistory } from 'react-router-dom';
import { withSnackbar } from 'notistack';

const ShareToken = (props) => {
  const [shareToken, setShareToken] = useState(null);

  // 1. Make a on submit function where we pull list of collections
  let history = useHistory();
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
          localStorage.setItem('userToken', shareToken);
          history.push('/list');
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
      <form id="shareToken" onSubmit={onSubmitHandler}>
        <label htmlFor="shareToken">Share token</label>
        <input type="text" onChange={onChangeHander} required />
        <input type="submit" value="Join an existing list" />
      </form>
    </>
  );
};

export default withSnackbar(ShareToken);
