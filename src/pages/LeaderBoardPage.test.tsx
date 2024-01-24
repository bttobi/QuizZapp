import { LeaderboardPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<LeaderboardPage />);

describe('LeaderboardPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays the LeaderboardPage content with data loaded', async () => {
    const { getByText, queryByText } = setup();
    await waitFor(() => {
      expect(getByText('Best Quiz Masters')).toBeInTheDocument();
      expect(getByText('robot')).toBeInTheDocument();
      expect(getByText('spadochroniarz')).toBeInTheDocument();
      expect(getByText('pilny_student')).toBeInTheDocument();
      expect(getByText('profesor')).toBeInTheDocument();
      expect(queryByText('byly_student')).not.toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
