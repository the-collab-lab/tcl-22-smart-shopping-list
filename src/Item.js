import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import estimates from './lib/estimates';

function Item({ userToken, item }) {
  const day = 24 * 60 * 60 * 1000; //amount of milliseconds in 24 hours
  const { purchaseDates, itemName, id, nextEstimate } = item;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (purchaseDates.length !== 0) {
      const timeChecked = 30000; // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
      const timeElapsed = Date.now() - purchaseDates[purchaseDates.length - 1];
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
      const date = new Date().getTime();
      const newDates = [...purchaseDates, date];
      console.log('Date: ', date, date / day);
      console.log(
        'Date from array: ',
        purchaseDates[purchaseDates.length - 1],
        purchaseDates[purchaseDates.length - 1] / day,
      );
      const latestInterval =
        (date - purchaseDates[purchaseDates.length - 1]) / day;
      const numberOfPurchases = newDates.length;
      const newInterval = estimates(
        nextEstimate,
        latestInterval,
        numberOfPurchases,
      );
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': newDates,
        'formData.nextEstimate': newInterval,
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
