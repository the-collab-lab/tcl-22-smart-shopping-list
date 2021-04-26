import React from 'react';
import Item from './Item';

function ItemList(props) {
  // Add function for when item is checked as purchased

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {props.loading && <span>Collection: Loading...</span>}
      {props.error && !props.loading && <strong>Error: {props.error}</strong>}
      {props.list && props.list.length > 0 && (
        <>
          <h2>Shopping List:</h2>
          <form>
            <ul>
              {props.list.map((item) => (
                <Item
                  id={item.id}
                  itemName={item.itemName}
                  lastPurchaseDate={item.lastPurchaseDate}
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
