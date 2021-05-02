import React from 'react';
import Item from './Item';
import { useHistory } from 'react-router-dom';

// 1. Add text field above shopping list
// 2. Pass list of items that was created in issue #6 to ItemsList component
// 3. Use item comparison function from issue #6 to filter shopping list and create a search results array
// 4. Map through search results array and render in ItemsList

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
          <form>
            <ul>
              {props.list.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  itemName={item.itemName}
                  purchaseDates={item.purchaseDates}
                  userToken={props.userToken}
                />
              ))}
            </ul>
          </form>
        </>
      )}
    </div>
  );
}
export default ItemList;
