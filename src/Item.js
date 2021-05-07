import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import estimates from './lib/estimates';
import { intervalToDuration, fromUnixTime } from 'date-fns';
import firebase from 'firebase/app';

function Item({ userToken, item }) {
  const { purchaseDates, itemName, id, purchaseEstimates } = item;
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
      purchaseEstimates.pop();
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': purchaseDates,
        'formData.purchaseEstimates ': purchaseEstimates,
      });
    } else {
      const newDate = new Date();
      const newDates = [...purchaseDates, newDate];
      const numberOfPurchases = newDates.length;
      let latestInterval = null;

      if (numberOfPurchases >= 2) {
        const lastDate = fromUnixTime(
          purchaseDates[purchaseDates.length - 1].seconds,
        );
        latestInterval = intervalToDuration({
          start: lastDate,
          end: newDate,
        }).days;
      }
      const lastEstimate =
        purchaseEstimates.length > 0
          ? purchaseEstimates[purchaseEstimates.length - 1]
          : null;
      const newInterval = estimates(
        lastEstimate,
        latestInterval,
        numberOfPurchases,
      );

      db.collection(userToken)
        .doc(id)
        .update({
          'formData.purchaseDates': newDates,
          'formData.purchaseEstimates ': firebase.firestore.FieldValue.arrayUnion(
            newInterval,
          ),
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
