import React from 'react';
import { Button } from './components';
import getToken from './lib/tokens';
import ShareToken from './ShareToken';

const Welcome = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
  };
  return (
    <div>
      <h2>Welcome to your Smart Shopping List!</h2>
      <Button
        buttonText="Create a new list"
        color="primary"
        onClick={() => storeToken()}
        type="button"
        variant="contained"
      />
      <hr />
      <ShareToken updateToken={props.updateToken} />
    </div>
  );
};

export default Welcome;
