import React, { useState } from 'react';
import { db } from './lib/firebase';

function AddItems(props) {
  const [groceryItem, setGroceryItem] = useState('');
  const [userToken, setUserToken] = useState('randomTokenOne');
  const updateGroceryItem = (event) => {
    setGroceryItem(event.target.value);
  };
  const submitGroceryItem = (event) => {
    event.preventDefault();
    const formData = {
      itemName: groceryItem,
      frequency: document.querySelectorAll('input[name=frequency]:checked')[0]
        .value,
      lastPurchaseDate: null,
    };
    db.collection(userToken).add({ formData });
    setGroceryItem('')
  };

  return (
    <div>
      <form id="test-form" onSubmit={submitGroceryItem}>
        <label htmlFor="item">Item name:</label>
        <input
          type="text"
          id="item"
          value={groceryItem}
          onChange={updateGroceryItem}
          required
        />
        <input type="radio" id="soon" value={7} name="frequency" required />
        <label htmlFor="soon">Soon (in the next 7 days)</label>
        <input
          type="radio"
          id="kindOfSoon"
          value={14}
          name="frequency"
          required
        />
        <label htmlFor="kindOfSoon">Kind of soon (in the next 14 days)</label>
        <input type="radio" id="notSoon" value={30} name="frequency" required />
        <label htmlFor="notSoon">Not soon (in the next 30 days)</label>
        <input type="submit" value="Add item" />
      </form>
    </div>
  );
}

export default AddItems;
