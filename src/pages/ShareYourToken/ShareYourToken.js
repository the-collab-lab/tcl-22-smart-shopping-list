import React from 'react';

function ShareYourToken(props) {
  let sharedUserToken = localStorage.getItem('userToken');

  return (
    <>
      <h2>Share your list</h2>
      <p>Copy the token below to share your shopping list with others:</p>
      <p>{sharedUserToken}</p>
      <input value={sharedUserToken} readOnly={true} />
      {document.queryCommandSupported('copy') && (
        <button

        //   props.callback(true);
        //   setTimeout(() => props.callback(false), 3000);
        //replace with notistack
        >
          COPY
        </button>
      )}
    </>
  );
}

export default ShareYourToken;
