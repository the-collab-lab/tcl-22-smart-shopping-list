import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';

function Item(props) {
  const [checked, setChecked] = useState(false);
  const { purchaseDates } = props;

  useEffect(() => {
    if (purchaseDates[purchaseDates.length - 1]) {
      const timeChecked = 86400; // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
      const timeElapsed =
        Date.now() / 1000 - purchaseDates[purchaseDates.length - 1].seconds;
      setChecked(timeElapsed <= timeChecked && true);
    }
  }, [purchaseDates]);

  const handleClick = () => {
    if (checked) {
      purchaseDates.pop();
      db.collection(props.userToken).doc(props.id).update({
        'formData.purchaseDates': purchaseDates,
      });
    } else {
      const date = new Date();
      db.collection(props.userToken)
        .doc(props.id)
        .update({
          'formData.purchaseDates': [...purchaseDates, date],
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
