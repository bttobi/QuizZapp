import { ExplorePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<ExplorePage />);

describe('ExplorePage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays the ExplorePage content with data loaded', async () => {
    const { queryByText, getByRole } = setup();
    await waitFor(() => {
      expect(getByRole('textbox')).toBeInTheDocument();
      expect(queryByText('Search')).toBeInTheDocument();
      expect(queryByText('Cooking')).toBeInTheDocument();
      expect(queryByText('Quiz name')).toBeInTheDocument();
      expect(queryByText('Quiz category')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
