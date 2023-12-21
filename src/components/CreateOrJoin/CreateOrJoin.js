import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { StyledWrapper, LogoWrapper, ButtonWrapper } from './elements';
import { Logo } from '../index';

const CreateOrJoin = (props) => {
  const storeToken = () => {
    // const token = getToken();
    // props.updateToken(token);
    // db.collection(token).doc('ListData').set({ listCreated: new Date() });
    console.log('Creating new lists is no longer supported');
  };

  return (
    <StyledWrapper>
      <LogoWrapper>
        <Logo type="animated" />
      </LogoWrapper>
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
