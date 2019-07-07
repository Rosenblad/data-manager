import React from 'react';
import Grid from '@material-ui/core/Grid';

import FolderItem, { IFolderItemProps } from './FolderItem';

export interface IFolderItemsProps {
  items?: IFolderItemProps[];
}

export default function FolderItems({ items = [] }: IFolderItemsProps) {
  return (
    <Grid container>
      {items.map(item => (
        <Grid item key={item.id}>
          <FolderItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
