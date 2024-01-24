import { HomePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<HomePage />);

describe('HomePage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays the HomePage content', async () => {
    const { getByText, getByRole } = setup();
    await waitFor(() => {
      expect(getByRole('button')).toBeInTheDocument();
      expect(
        getByText(/Welcome to our dynamic quiz creation platform - QuizZapp!/i)
      ).toBeDefined();
      expect(getByRole('img')).toBeInTheDocument();
      expect(getByText(/Registered users/i)).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
