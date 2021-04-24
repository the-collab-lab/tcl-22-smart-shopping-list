import React from 'react';
import getToken from './lib/tokens';
import { useHistory } from 'react-router-dom';
import ShareToken from './ShareToken';

const Welcome = (props) => {
  let history = useHistory();

  const storeToken = () => {
    const token = getToken();
    localStorage.setItem('userToken', token);
    props.setToken(token);
    history.push('/list');
  };
  return (
    <div>
      <h2>Welcome to your Smart Shopping List!</h2>
      <button onClick={() => storeToken()}>Create a new list</button>
      <hr />
      <ShareToken setToken={props.setToken} />
    </div>
  );
};

export default Welcome;
