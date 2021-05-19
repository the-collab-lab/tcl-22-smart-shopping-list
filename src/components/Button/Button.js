import { Button as MuiButton } from '@material-ui/core';
import React from 'react';

const Button = ({ onClick, buttonText, variant, color, size }) => {
  return (
    <MuiButton onClick={onClick} variant={variant} color={color} size={size}>
      {buttonText}
    </MuiButton>
  );
};

export default Button;
