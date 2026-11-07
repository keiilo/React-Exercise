import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the post composer', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/what is happening/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^post$/i })).toBeInTheDocument();
});
