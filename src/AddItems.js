import React, { useState } from 'react';
import { db } from './lib/firebase';
import { useSnackbar } from 'notistack';
import filter from './lib/filter';

function AddItems(props) {
  const [groceryItem, setGroceryItem] = useState('');
  const [itemFreq, setItemFreq] = useState(7);

  const { enqueueSnackbar } = useSnackbar();

  const updateGroceryItem = (event) => {
    setGroceryItem(event.target.value);
  };

  const submitGroceryItem = (event) => {
    event.preventDefault();
    const formData = {
      itemName: groceryItem,
      frequency: itemFreq,
      purchaseDates: [],
      purchaseEstimates: [],
    };

    const filtered = filter(props.list, groceryItem, true);

    if (filtered.length > 0) {
      enqueueSnackbar('This item is already on your list', {
        variant: 'error',
      });
    } else {
      db.collection(props.userToken).add({ formData });
      setGroceryItem('');
      setItemFreq(7);
      enqueueSnackbar(`${groceryItem} successfully added`, {
        variant: 'success',
      });
    }
  };

  const radioBtnHandler = (event) => {
    setItemFreq(+event.target.value);
  };

  return (
    <div>
      <form id="test-form" onSubmit={submitGroceryItem}>
        <label htmlFor="item">Item name:</label>
        <input
          type="text"
          id="item"
          value={groceryItem}
          required
          onChange={updateGroceryItem}
        />
        <fieldset>
          <input
            type="radio"
            id="soon"
            value={7}
            name="frequency"
            checked={itemFreq === 7}
            required
            onChange={(e) => radioBtnHandler(e)}
          />
          <label htmlFor="soon">Soon (in the next 7 days)</label>
          <input
            type="radio"
            id="kindOfSoon"
            value={14}
            name="frequency"
            checked={itemFreq === 14}
            required
            onChange={(e) => radioBtnHandler(e)}
          />
          <label htmlFor="kindOfSoon">Kind of soon (in the next 14 days)</label>
          <input
            type="radio"
            id="notSoon"
            value={30}
            name="frequency"
            checked={itemFreq === 30}
            required
            onChange={(e) => radioBtnHandler(e)}
          />
          <label htmlFor="notSoon">Not soon (in the next 30 days)</label>
        </fieldset>
        <input type="submit" value="Add item" />
      </form>
    </div>
  );
}

export default AddItems;
