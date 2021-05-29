import React from 'react';
import { Button, Typography } from '@material-ui/core';
import getToken from '../../lib/tokens';
import { db } from '../../lib/firebase';

const CreateOrJoin = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
    db.collection(token).doc('ListData').set({ listCreated: new Date() });
  };
  return (
    <div>
      <Typography variant="h1" style={{ color: 'white' }}>
        Welcome to your smart shopping list
      </Typography>
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

export default CreateOrJoin;
