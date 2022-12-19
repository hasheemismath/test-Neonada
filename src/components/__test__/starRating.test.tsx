import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarRating from '../starRating';

describe('star component test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render star component', () => {
    const props = {
      rate: 6,
    };
    render(
      <BrowserRouter>
        <StarRating {...props} />
      </BrowserRouter>
    );
    const starElement = screen.getByTestId('rating');
    expect(starElement).toBeInTheDocument();
  });
});
