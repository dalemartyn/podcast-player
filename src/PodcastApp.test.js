import React from 'react';
import { render } from '@testing-library/react';
import PodcastApp from './PodcastApp';

test('renders learn react link', () => {
  const { getByText } = render(<PodcastApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
