import React, { useState } from 'react';
import { db } from './lib/firebase';
import { capitalize } from './lib/utility';

function AddItems(props) {
  const [groceryItem, setGroceryItem] = useState('');
  const [userToken, setUserToken] = useState('randomTokenOne');
  const [itemFreq, setItemFreq] = useState(7);
  const [formValidationVisual, setFormValidationVisual] = useState(false);

  const updateGroceryItem = (event) => {
    setGroceryItem(capitalize(event.target.value));
    setFormValidationVisual(true);
  };

  const submitGroceryItem = (event) => {
    event.preventDefault();
    const formData = {
      itemName: groceryItem,
      frequency: itemFreq,
      lastPurchaseDate: null,
    };
    db.collection(userToken).add({ formData });
    setGroceryItem('');
    setItemFreq(7);
    setFormValidationVisual(false);
  };

  const radioBtnHandler = (event) => {
    setItemFreq(+event.target.value);
    setFormValidationVisual(true);
  };

  return (
    <div>
      <form id="test-form" onSubmit={submitGroceryItem}>
        <label htmlFor="item">Item name:</label>
        <input
          type="text"
          id="item"
          value={groceryItem}
          required={formValidationVisual}
          onChange={updateGroceryItem}
        />
        <input
          type="radio"
          id="soon"
          value={7}
          name="frequency"
          checked={itemFreq === 7}
          required={formValidationVisual}
          onChange={radioBtnHandler}
        />
        <label htmlFor="soon">Soon (in the next 7 days)</label>
        <input
          type="radio"
          id="kindOfSoon"
          value={14}
          name="frequency"
          checked={itemFreq === 14}
          required={formValidationVisual}
          onChange={radioBtnHandler}
        />
        <label htmlFor="kindOfSoon">Kind of soon (in the next 14 days)</label>
        <input
          type="radio"
          id="notSoon"
          value={30}
          name="frequency"
          checked={itemFreq === 30}
          required={formValidationVisual}
          onChange={radioBtnHandler}
        />
        <label htmlFor="notSoon">Not soon (in the next 30 days)</label>
        <input type="submit" value="Add item" />
      </form>
    </div>
  );
}

export default AddItems;
