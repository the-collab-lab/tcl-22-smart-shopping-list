import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';

function Item(props) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setChecked(props.lastPurchaseDate && true);
  }, [props.lastPurchaseDate]);

  const handleClick = () => {
    if (checked) {
      db.collection(props.userToken).doc(props.id).update({
        'formData.lastPurchaseDate': null,
      });
    } else {
      const date = new Date();
      db.collection(props.userToken).doc(props.id).update({
        'formData.lastPurchaseDate': date,
      });
    }
    setChecked(!checked);
  };

  // Check if the date of purchase was within 24hrs,
  // If yes, disable checkbox

  return (
    <li key={props.id}>
      <label>
        <input
          type="checkbox"
          name={props.itemName}
          checked={checked}
          onClick={handleClick}
        />
        {props.itemName}
      </label>
    </li>
  );
}

export default Item;
