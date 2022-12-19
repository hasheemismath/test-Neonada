import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarringItem from '../starringItem';

describe('show component test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render starring component', () => {
    const props = {
      person: 'Jhon Whick',
      role: 'Co-host',
    };
    render(
      <BrowserRouter>
        <StarringItem {...props} />
      </BrowserRouter>
    );
    const starringElement = screen.getByTestId('starring');
    expect(starringElement).toBeInTheDocument();
  });

  test('should reneder props content', () => {
    const props = {
      person: 'Jhon Whick',
      role: 'Co-host',
    };
    render(
      <BrowserRouter>
        <StarringItem {...props} />
      </BrowserRouter>
    );
    const personElement = screen.getByTestId('person');
    const roleElement = screen.getByTestId('role');

    expect(personElement).toHaveTextContent(props.person);
    expect(roleElement).toHaveTextContent(props.role);
  });
});
