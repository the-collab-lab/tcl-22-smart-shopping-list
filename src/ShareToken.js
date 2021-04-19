import React, { useState } from 'react';
import firebase from './lib/firebase';
import { db } from './lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ShareToken = () => {
  const [shareToken, setShareToken] = useState(null);

  // 1. Make a on submit function where we pull list of collections
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(shareToken);
  };

  // 2. Create change function that keeps track of user input
  const onChangeHander = (event) => {
    setShareToken(event.target.value);
  };

  // 3. In submit function we will compare the collections list with submitted token
  // 4a. If exists then take user to shopping list
  // 4b. If doesn't exist then notify user as such

  return (
    <>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form id="shareToken" onSubmit={onSubmitHandler}>
        <label htmlFor="shareToken">Share token</label>
        <input type="text" onChange={onChangeHander} required />
        <input type="submit" value="Join an existing list" />
      </form>
    </>
  );
};

export default ShareToken;
