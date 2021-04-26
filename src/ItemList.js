import React from 'react';
import { useHistory } from 'react-router-dom';

function ItemList(props) {
  let history = useHistory();
  const redirect = () => {
    history.push('/additems');
  };

  return (
    <div>
      {props.loading && <span>Collection: Loading...</span>}
      {props.error && !props.loading && <strong>Error: {props.error}</strong>}
      {props.list && props.list.length === 0 && (
        <>
          <p>Your shopping list is currently empty.</p>
          <button onClick={redirect}>Add Item</button>
        </>
      )}
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
