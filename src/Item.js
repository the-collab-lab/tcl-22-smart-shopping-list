import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';

function Item(props) {
  const { purchaseDates, userToken, itemName, id } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (purchaseDates.length !== 0) {
      const timeChecked = 86400; // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
      const timeElapsed =
        Date.now() / 1000 - purchaseDates[purchaseDates.length - 1].seconds;
      // Check if the elapsed time since last purchase was within timeChecked value & uncheck if exceeded timeChecked value
      setChecked(timeElapsed <= timeChecked && true);
    }
  }, [purchaseDates]);

  const handleClick = () => {
    if (checked) {
      purchaseDates.pop();
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': purchaseDates,
      });
    } else {
      const date = new Date();
      db.collection(userToken)
        .doc(id)
        .update({
          'formData.purchaseDates': [...purchaseDates, date],
        });
    }
    setChecked(!checked);
  };

  return (
    <li>
      <label htmlFor={itemName}>
        <input
          type="checkbox"
          name={itemName}
          id={itemName}
          checked={checked}
          onChange={handleClick}
        />
        {itemName}
      </label>
    </li>
  );
}

export default Item;
