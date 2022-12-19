import { render, screen, cleanup } from '@testing-library/react';
import InfoItem from '../infoItem';

describe('show component test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render show component', () => {
    const props = {
      title: 'title',
      value: 'value',
    };
    render(<InfoItem {...props} />);

    const infoItemElement = screen.getByTestId('infoItem');
    expect(infoItemElement).toBeInTheDocument();
  });

  test('should render show props', () => {
    const props = {
      title: 'title',
      value: 'value',
    };
    render(<InfoItem {...props} />);
    const title = screen.getByTestId('title');
    const value = screen.getByTestId('value');
    expect(title).toHaveTextContent(props.title);
    expect(value).toHaveTextContent(props.value);
  });

  test('should render array of values within props ', () => {
    const props = {
      title: 'title',
      value: ['value1', 'value2'],
    };

    render(<InfoItem {...props} />);
    const title = screen.getByTestId('title');
    const value = screen.getByTestId('value');
    expect(title).toHaveTextContent(props.title);
    expect(value).toHaveTextContent(props.value.toString());
  });
});
