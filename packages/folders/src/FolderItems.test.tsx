import React from 'react';
import { render } from '@testing-library/react';

import FolderItems from './FolderItems';

const mockItems = [
  {
    id: 'id_001',
    title: 'Title_001',
  },
  {
    id: 'id_002',
    title: 'Title_002',
  },
];

describe('FolderItems', () => {
  it('renders folder items', () => {
    const { getByText } = render(<FolderItems items={mockItems} />);
    expect(getByText(mockItems[0].title)).toBeDefined();
    expect(getByText(mockItems[1].title)).toBeDefined();
  });
});
