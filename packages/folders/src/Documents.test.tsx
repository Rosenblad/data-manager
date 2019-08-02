import React from 'react';
import { render } from '@testing-library/react';

import Documents from './Documents';

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

describe('Documents', () => {
  it('renders folder items', () => {
    const { getByText } = render(<Documents items={mockItems} />);
    expect(getByText(mockItems[0].title)).toBeDefined();
    expect(getByText(mockItems[1].title)).toBeDefined();
  });
});
