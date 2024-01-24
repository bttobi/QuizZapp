import { Route, Routes } from 'react-router-dom';
import { UserQuizzesPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () =>
  render(
    <Routes>
      <Route path="/quizzes" element={<UserQuizzesPage />} />
    </Routes>,
    { initialEntries: ['/quizzes'] }
  );

describe('UserQuizzesPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays fetched user stats data', async () => {
    const { getByText, getAllByText } = setup();
    await waitFor(() => {
      expect(getByText('Quiz name')).toBeInTheDocument();
      expect(getByText('Quiz category')).toBeInTheDocument();
      expect(getByText('Delete')).toBeInTheDocument();
      expect(getByText('Select all from page')).toBeInTheDocument();
      expect(getByText('4')).toBeInTheDocument();
      expect(getAllByText(/Author: test/i)).toHaveLength(2);
      expect(getByText('My test')).toBeInTheDocument();
      expect(getByText('FOOD')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
