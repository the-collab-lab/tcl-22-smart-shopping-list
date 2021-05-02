import React from 'react';

// 1. Add text field above shopping list
// 2. Pass list of items that was created in issue #6 to ItemsList component
// 3. Use item comparison function from issue #6 to filter shopping list and create a search results array
// 4. Map through search results array and render in ItemsList

function ItemList(props) {
  return (
    <div>
      {props.loading && <span>Collection: Loading...</span>}
      {props.error && !props.loading && <strong>Error: {props.error}</strong>}
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
