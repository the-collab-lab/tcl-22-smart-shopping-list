import React from 'react';
import { Button } from '@material-ui/core';
import getToken from '../../lib/tokens';
import ShareToken from '../../components/ShareToken';

const Welcome = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
  };
  return (
    <div>
      <h2>Welcome to your Smart Shopping List!</h2>
      <Button
        color="primary"
        onClick={() => storeToken()}
        type="button"
        variant="contained"
      >
        Create a new list
      </Button>
      <hr />
      <ShareToken updateToken={props.updateToken} />
    </div>
  );
};

export default Welcome;