import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import estimates from './lib/estimates';
import { intervalToDuration, fromUnixTime } from 'date-fns';

function Item({ userToken, item }) {
  const { purchaseDates, itemName, id, nextEstimate } = item;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (purchaseDates.length !== 0) {
      const timeChecked = 30; // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
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
      const newDate = new Date();
      const lastDate = fromUnixTime(
        purchaseDates[purchaseDates.length - 1].seconds,
      );
      const newDates = [...purchaseDates, newDate];
      const latestInterval = intervalToDuration({
        start: lastDate,
        end: newDate,
      }).days;
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
