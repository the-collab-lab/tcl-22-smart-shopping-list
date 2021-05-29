import React from 'react';
import { Button, Typography } from '@material-ui/core';
import getToken from '../../lib/tokens';
import { db } from '../../lib/firebase';
import { StyledWrapper, ButtonWrapper } from './elements';
import Logo from './../../logo.svg';

const CreateOrJoin = (props) => {
  const storeToken = () => {
    const token = getToken();
    props.updateToken(token);
    db.collection(token).doc('ListData').set({ listCreated: new Date() });
  };
  return (
    <StyledWrapper>
      <img src={Logo} alt="avoCart logo" className="largeLogo" />
      <Typography
        variant="h1"
        style={{ color: 'white', paddingTop: '2rem', paddingBottom: '2rem' }}
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
