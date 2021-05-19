import { TextField as MuiTextField } from '@material-ui/core';
import React from 'react';

const TextField = ({ variant, onChange }) => {
  return <MuiTextField variant={variant} onChange={onChange} required />;
};

export default TextField;
