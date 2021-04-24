import React from 'react';
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
      <button onClick={() => storeToken()}>Create a new list</button>
      <hr />
      <ShareToken updateToken={props.updateToken} />
    </div>
  );
};

export default Welcome;
