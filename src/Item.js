import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';

function Item(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // setChecked(props.lastPurchaseDate && true);
    if (props.lastPurchaseDate) {
      const timeChecked = 86400; //Change this value if you don't want to wait 24 hrs
      const timeElapsed = Date.now() / 1000 - props.lastPurchaseDate.seconds;
      setChecked(timeElapsed <= timeChecked && true);
    }
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
    <li>
      <label>
        <input
          type="checkbox"
          name={props.itemName}
          checked={checked}
          onChange={handleClick}
        />
        {props.itemName}
      </label>
    </li>
  );
}

export default Item;
