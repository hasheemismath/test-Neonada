import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Show from '../show';

describe('show component test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render show component', () => {
    const show = {
      id: '55455',
      url: 'https://static.tvmaze.com/uploads/images/medium_portrait/414/1035387.jpg',
      name: 'The Price is Right',
      rating: 5.6,
      summary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    };
    render(
      <BrowserRouter>
        <Show {...show} />
      </BrowserRouter>
    );
    const showElement = screen.getByTestId(show.id);
    expect(showElement).toBeInTheDocument();
  });

  test('should show img', () => {
    const show = {
      id: '55455',
      url: 'https://static.tvmaze.com/uploads/images/medium_portrait/414/1035387.jpg',
      name: 'The Price is Right',
      rating: 5.6,
      summary:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    };
    render(
      <BrowserRouter>
        <Show {...show} />
      </BrowserRouter>
    );
    const image = screen.getByAltText(show.name);
    expect(image).toHaveAttribute('src', show.url);
    const summary = screen.getByTestId('summary');
    expect(summary).toHaveTextContent(show.summary);
  });
});
