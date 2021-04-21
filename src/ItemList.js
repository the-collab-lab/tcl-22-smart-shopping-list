import React from 'react';

function ItemList(props) {
  return (
    <div>
      {props.error && <strong>Error: {JSON.stringify(props.error)}</strong>}
      {props.loading && <span>Collection: Loading...</span>}
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
