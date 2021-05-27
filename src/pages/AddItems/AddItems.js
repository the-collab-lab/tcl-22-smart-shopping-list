import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { useSnackbar } from 'notistack';
import filter from '../../lib/filter';
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from '@material-ui/core';
import { StyledForm } from './elements';

function AddItems(props) {
  const [groceryItem, setGroceryItem] = useState('');
  const [itemFreq, setItemFreq] = useState(7);

  const { enqueueSnackbar } = useSnackbar();

  const updateGroceryItem = (event) => {
    setGroceryItem(event.target.value);
  };

  const submitGroceryItem = (event) => {
    event.preventDefault();
    const formData = {
      itemName: groceryItem,
      dateAdded: new Date(),
      purchaseDates: [],
      purchaseEstimates: [itemFreq],
    };

    const filtered = filter(props.list, groceryItem, true);

    if (filtered.length > 0) {
      enqueueSnackbar('This item is already on your list', {
        variant: 'error',
      });
    } else {
      db.collection(props.userToken).add({ formData });
      setGroceryItem('');
      setItemFreq(7);
      enqueueSnackbar(`${groceryItem} successfully added`, {
        variant: 'success',
      });
    }
  };

  const radioBtnHandler = (event) => {
    setItemFreq(+event.target.value);
  };

  return (
    <div>
      <StyledForm id="add-item-form" onSubmit={submitGroceryItem}>
        <TextField
          id="item"
          label="Item name:"
          variant="outlined"
          value={groceryItem}
          required
          onChange={updateGroceryItem}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            How soon do you need to buy it?
          </FormLabel>
          <RadioGroup
            aria-label="How soon do you need to buy it?"
            name="frequency"
            value={itemFreq}
            onChange={(e) => radioBtnHandler(e)}
            required
          >
            <FormControlLabel
              value={7}
              control={<Radio />}
              label="Soon (in the next week)"
              checked={itemFreq === 7}
            />
            <FormControlLabel
              value={14}
              control={<Radio />}
              label="Kind of soon (in the next couple of weeks)"
              checked={itemFreq === 14}
            />
            <FormControlLabel
              value={30}
              control={<Radio />}
              label="Not soon (in the next month)"
              checked={itemFreq === 30}
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          disabled={groceryItem.length === 0}
          variant="contained"
        >
          Add item
        </Button>
      </StyledForm>
    </div>
  );
}

export default AddItems;
