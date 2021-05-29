import { differenceInDays, fromUnixTime } from 'date-fns';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Modal } from './components';
import estimates from './lib/estimates';
import { db } from './lib/firebase';
import styled from 'styled-components';
import { Checkbox, Typography } from '@material-ui/core';
import { FaTrashAlt } from 'react-icons/fa';

const ItemStyle = styled.ul`
  text-align: left;
  background-color: lightgray;
  color: black;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;

const DeleteBtn = styled.button`
  position: relative;
  float: right;
  margin: 0 20px 0 0;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

function Item({ userToken, item, status }) {
  const {
    itemName,
    id,
    dateAdded,
    purchaseDates,
    purchaseEstimates = [],
  } = item;

  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Note that timeChecked value represents seconds (86400 secs in 24 hrs)
    const timeChecked = localStorage.getItem('expirationDuration', 10) || 86400;
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
  }, [purchaseDates, dateAdded]);

  const handleClick = () => {
    if (checked) {
      // Remove the latest purchase date and estimate from the database:
      purchaseDates.pop();
      // Don't remove the first estimate that comes from user input:
      purchaseEstimates.length > 1 && purchaseEstimates.pop();
      db.collection(userToken).doc(id).update({
        'formData.purchaseDates': purchaseDates,
        'formData.purchaseEstimates': purchaseEstimates,
      });
    } else {
      // Add new date and estimate to the database:
      const newDate = new Date();
      const newDates = [...purchaseDates, newDate];
      const numberOfPurchases = newDates.length;

      const lastDate =
        numberOfPurchases >= 2
          ? fromUnixTime(purchaseDates[purchaseDates.length - 1].seconds)
          : fromUnixTime(dateAdded?.seconds);

      const latestInterval = differenceInDays(newDate, lastDate);

      let lastEstimate;
      if (purchaseEstimates.length > 0) {
        lastEstimate = purchaseEstimates[purchaseEstimates.length - 1];
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
        enqueueSnackbar(`${itemName} successfully deleted`, {
          variant: 'warning',
        });
      })
      .catch(() => {
        enqueueSnackbar('Oops! Something went wrong.', {
          variant: 'error',
        });
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
    <ItemStyle>
      <label htmlFor={itemName} aria-label={itemName + ' (' + status + ')'}>
        <Checkbox
          type="checkbox"
          name={itemName}
          id={itemName}
          checked={checked}
          onChange={handleClick}
          color="secondary"
        />
        {itemName}
      </label>

      {/* // [delete-item] 1. Create a button next to each item in list */}
      <DeleteBtn type="button" onClick={handleOpenModal} aria-label={`delete ${itemName}`}>
        <FaTrashAlt className="trash-icon" />
      </DeleteBtn>

      {/* // [delete-item] 2. Create a button modal that will render when user tries to delete item */}
      <Typography variant="p">
        <Modal
          cancelLabel="Cancel"
          confirmLabel="Yes"
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          open={openModal}
          title={
            <>
              Are you sure you want to delete <span>{itemName}</span> from your
              list?
            </>
          }
          titleId="delete-modal-title"
        />
      </Typography>
    </ItemStyle>
  );
}

export default Item;
