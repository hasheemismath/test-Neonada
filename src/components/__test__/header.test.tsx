import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('header component test', () => {
  test('should render header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
  test('should have a text TV Bland', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toHaveTextContent('TV Bland');
  });
});
