import React from 'react';
import getToken from './lib/tokens';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
  let history = useHistory();

  const storeToken = () => {
    const token = getToken();
    localStorage.setItem('userToken', token);
    history.push('/list');
  };
  return (
    <div>
      <h2>Welcome to your Smart Shopping List!</h2>
      <button onClick={() => storeToken()}>Create a new list</button>
      {/* 
      Create form as option for user to enter a shared token and
      join the existing list
      */}
    </div>
  );
};

export default Welcome;
