import { Button as MuiButton } from '@material-ui/core';
import React from 'react';

const Button = ({ buttonText, color, onClick, size, type, variant }) => {
  return (
    <MuiButton
      color={color}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
    >
      {buttonText}
    </MuiButton>
  );
};

export default Button;
