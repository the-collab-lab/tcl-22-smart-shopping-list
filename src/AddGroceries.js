import React, { useState } from 'react';
import { db } from './lib/firebase';

function AddGroceries(props) {
  const [groceryItem, setGroceryItem] = useState('');
  const updateGroceryItem = (event) => {
    setGroceryItem(event.target.value);
  };
  const submitGroceryItem = (event) => {
    event.preventDefault();
    db.collection('items').add({
      input: { groceryItem },
    });
  };

  return (
    <div>
      <form id="test-form" onSubmit={submitGroceryItem}>
        <input type="text" value={groceryItem} onChange={updateGroceryItem} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddGroceries;
