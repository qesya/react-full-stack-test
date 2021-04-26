import { render } from '@testing-library/react';
import LaunchCard from '.';

test('LaunchCard', () => {
  const { queryByLabelText } = render(
    <LaunchCard
      image={''}
      title="title"
    />,
  )

  expect(queryByLabelText(/title/i))
});