import React from 'react';

function ItemList(props) {
  return (
    <div>
      {props.loading && <span>Collection: Loading...</span>}
      {props.error && <strong>Error: {props.error}</strong>}
      {props.list && props.list.length > 0 && (
        <>
          <h2>Shopping List:</h2>
          <ul>
            {props.list.map((item, ind) => (
              <li key={ind}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
export default ItemList;
