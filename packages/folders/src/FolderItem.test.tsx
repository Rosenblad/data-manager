import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';

import FolderItem from './FolderItem';

describe('FolderItem', () => {
  const props = { id: 'id' };

  it('renders title', () => {
    const { getByText } = render(<FolderItem {...props} title="Title" />);
    expect(getByText('Title')).toBeDefined();
  });

  it('renders secondary title', () => {
    const { getByText } = render(<FolderItem {...props} secondaryTitle="Secondary" />);
    expect(getByText('Secondary')).toBeDefined();
  });

  it('renders an image', () => {
    const { getByTitle } = render(<FolderItem {...props} image="http://example.com/img.jpg" />);
    const image = getByTitle('Image');
    expect(image).toBeDefined();
  });

  it('renders meta', () => {
    const mockMeta = [{ key: 'metakey', value: 'metavalue' }];
    const { getByText } = render(<FolderItem {...props} meta={mockMeta} />);
    expect(getByText('metakey')).toBeDefined();
    expect(getByText('metavalue')).toBeDefined();
  });

  it('renders actions', () => {
    const handleClickDelete = jest.fn();
    const { getByTitle } = render(<FolderItem {...props} onClickDelete={handleClickDelete} />);

    const deleteButton = getByTitle('Delete');
    fireEvent.click(deleteButton);

    expect(handleClickDelete).toHaveBeenCalledTimes(1);
  });
});
