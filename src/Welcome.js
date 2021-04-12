import React from 'react';

const Welcome = (props) => {
  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>
      <button onClick={() => props.storeToken()}>Create a new list</button>
    </div>
  );
};

export default Welcome;
