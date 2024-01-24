import { QuizCreatePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<QuizCreatePage />);

describe('QuizCreatePage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays create quiz form', async () => {
    const { getAllByRole, getByText, getAllByText } = setup();
    await waitFor(() => {
      expect(getAllByRole('textbox')).toHaveLength(2);
      expect(getByText('Quiz name')).toBeInTheDocument();
      expect(getAllByText('Create new quiz!')).toHaveLength(2);
      expect(getByText('Quiz category')).toBeInTheDocument();
      expect(getByText('Link to thumbnail')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
