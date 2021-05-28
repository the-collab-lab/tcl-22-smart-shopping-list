import React from 'react';
import { Button } from '@material-ui/core';
import getToken from '../../lib/tokens';
import { db } from '../../lib/firebase';

const JoinList = (props) => {
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
    </div>
  );
};

export default JoinList;