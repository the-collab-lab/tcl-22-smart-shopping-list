import React from 'react';
import getToken from './lib/tokens';

const Welcome = () => {
  const storeToken = () => {
    const token = getToken();
    localStorage.setItem('userToken', token);
    window.location.replace('/list');
  };
  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>
      <button onClick={() => storeToken()}>Create a new list</button>
    </div>
  );
};

export default Welcome;
