import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import estimates from './lib/estimates';
import { differenceInDays, fromUnixTime } from 'date-fns';
import { Modal } from '@material-ui/core';
import StyledModalLayout, { StyledModalBtn } from './StyledModal';

function Item({ userToken, item }) {
  const { itemName, id, purchaseDates, purchaseEstimates = [] } = item;
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
    const timeChecked = 86400;
    let timeoutID;

    if (purchaseDates.length !== 0) {
      const timeElapsed =
        Date.now() / 1000 - purchaseDates[purchaseDates.length - 1].seconds;

      // Check if the elapsed time since last purchase was within timeChecked value & uncheck if exceeded timeChecked value
      if (timeElapsed <= timeChecked) {
        setChecked(true);
        // Clear the checkbox when the rest of the timeChecked interval has passed:
        timeoutID = setTimeout(
          () => setChecked(false),
          (timeChecked - timeElapsed) * 1000,
        );
      }
    }

    return () => clearTimeout(timeoutID);
  }, [purchaseDates]);

  const handleClick = () => {
    if (checked) {
      // Remove the latest purchase date and estimate from the database:
      purchaseDates.pop();
      purchaseEstimates.length > 0 && purchaseEstimates.pop();
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': purchaseDates,
        'formData.purchaseEstimates': purchaseEstimates,
      });
    } else {
      // Add new date and estimate to the database:
      const newDate = new Date();
      const newDates = [...purchaseDates, newDate];
      const numberOfPurchases = newDates.length;
      let lastEstimate;
      let latestInterval;

      if (numberOfPurchases >= 2) {
        const lastDate = fromUnixTime(
          purchaseDates[purchaseDates.length - 1].seconds,
        );
        latestInterval = differenceInDays(newDate, lastDate);

        if (purchaseEstimates.length > 0) {
          lastEstimate = purchaseEstimates[purchaseEstimates.length - 1];
        }
      }
      const newInterval = estimates(
        lastEstimate,
        latestInterval,
        numberOfPurchases,
      );
      newInterval && purchaseEstimates.push(newInterval);
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': newDates,
        'formData.purchaseEstimates': purchaseEstimates,
      });
    }
    setChecked(!checked);
  };

  // [delete-item] 4a. If yes, then remove from firestore database
  const handleDelete = () => {
    setOpenModal(true);
    db.collection(userToken)
      .doc(id)
      .delete()
      .then(() => {
        console.log('it worked!');
      });
  };

  // [delete-item] 4b. If no, then the modal closes
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // [delete-item] 3. Create a function that is passed to onClick which will render a mondal which asks the user 'You sure about dat?'
  const handleOpenModal = () => {
    setOpenModal(true);
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
      {/* // [delete-item] 1. Create a button next to each item in list */}
      <button type="button" onClick={handleOpenModal}>
        X
      </button>
      {/* // [delete-item] 2. Create a button modal that will render when user tries to delete item */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
      >
        <StyledModalLayout>
          <h1>
            Are you sure you want to delete <span>{itemName}</span> from your
            list?
          </h1>
          <StyledModalBtn type="button" onClick={handleCloseModal}>
            Cancel
          </StyledModalBtn>
          <StyledModalBtn type="button" onClick={handleDelete}>
            Yes
          </StyledModalBtn>
        </StyledModalLayout>
      </Modal>
    </li>
  );
}

export default Item;
