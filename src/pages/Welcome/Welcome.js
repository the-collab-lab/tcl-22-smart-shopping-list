import React from 'react';
import { Button } from '@material-ui/core';
import { primary, neutral, accent } from './../../components/index';
import getToken from '../../lib/tokens';
import ShareToken from '../../components/ShareToken';

const Welcome = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
  };
  return (
    <>
      <h2>Welcome to your Smart Shopping List!</h2>
      <Button
        style={{ color: primary.main, backgroundColor: 'white' }}
        onClick={() => storeToken()}
        type="button"
        variant="contained"
      >
        Create new list
      </Button>
      <hr />
      <ShareToken updateToken={props.updateToken} />
    </>
  );
};

export default Welcome;
