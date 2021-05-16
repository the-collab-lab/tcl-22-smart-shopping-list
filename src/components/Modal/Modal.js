import { Modal as MuiModal } from '@material-ui/core';
import React from 'react';
import { StyledModalBtn, StyledModalLayout } from './elements';

const Modal = ({
  cancelLabel,
  children,
  confirmLabel,
  onClose,
  onConfirm,
  open,
  title,
  titleId,
}) => {
  return (
    <MuiModal open={open} onClose={onClose} aria-labelledby={titleId}>
      <StyledModalLayout>
        <h1 id={titleId}>{title}</h1>
        {children}
        <StyledModalBtn type="button" onClick={onClose}>
          {cancelLabel}
        </StyledModalBtn>
        <StyledModalBtn type="button" onClick={onConfirm}>
          {confirmLabel}
        </StyledModalBtn>
      </StyledModalLayout>
    </MuiModal>
  );
};

export default Modal;
