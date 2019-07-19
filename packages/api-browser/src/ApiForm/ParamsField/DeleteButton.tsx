import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export interface DeleteButtonProps {
  onClick: () => void;
}

export default React.memo(function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  )
});
