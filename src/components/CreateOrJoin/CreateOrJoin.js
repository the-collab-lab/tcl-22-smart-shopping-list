import React from 'react';
import { Button, Typography } from '@material-ui/core';
import getToken from '../../lib/tokens';
import { db } from '../../lib/firebase';
import { StyledWrapper, ButtonWrapper } from './elements';

const CreateOrJoin = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
    db.collection(token).doc('ListData').set({ listCreated: new Date() });
  };
  return (
    <StyledWrapper>
      <Typography
        variant="h1"
        style={{ color: 'white', paddingBottom: '2rem' }}
      >
        Welcome to your smart shopping list
      </Typography>
      <ButtonWrapper>
        <Button
          color="primary"
          onClick={() => storeToken()}
          type="button"
          variant="outlined"
        >
          Create new list
        </Button>
      </ButtonWrapper>
    </StyledWrapper>
  );
};

export default CreateOrJoin;
