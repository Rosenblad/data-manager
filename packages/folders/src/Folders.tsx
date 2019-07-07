import React from 'react';
import FolderItems, { IFolderItemsProps } from './FolderItems';

export default function Folders({ items }: IFolderItemsProps) {
  return <FolderItems items={items} />;
}
