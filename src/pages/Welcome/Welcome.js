import React from 'react';
import { Button } from '@material-ui/core';
import getToken from '../../lib/tokens';
import { db } from '../../lib/firebase';
import ShareToken from '../../components/ShareToken';

const Welcome = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
    db.collection(token).doc('ListData').set({ listCreated: new Date() });
  };
  return (
    <div>
      <h2>Welcome to your smart shopping list!</h2>
      <Button
        color="primary"
        onClick={() => storeToken()}
        type="button"
        variant="outlined"
      >
        Create new list
      </Button>
      <br />
      <Button color="primary" type="button" variant="contained">
        Join existing list
      </Button>
      <hr />
      <ShareToken updateToken={props.updateToken} />
    </div>
  );
};

export default Welcome;
