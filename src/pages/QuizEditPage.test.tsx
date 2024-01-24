import { Route, Routes } from 'react-router-dom';
import { QuizEditPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () =>
  render(
    <Routes>
      <Route path="/quiz/edit/:quizID" element={<QuizEditPage />} />
    </Routes>,
    { initialEntries: ['/quiz/edit/1'] }
  );

describe('QuizEditPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays quiz edit form with fetched data', async () => {
    const { getAllByRole, getByText, getAllByText } = setup();
    await waitFor(() => {
      expect(getAllByRole('textbox')).toHaveLength(2);
      expect(getByText('Quiz name')).toBeInTheDocument();
      expect(getAllByText('Submit quiz edit!')).toHaveLength(2);
      expect(getByText('Quiz category')).toBeInTheDocument();
      expect(getByText('Link to thumbnail')).toBeInTheDocument();
      expect(getByText('Current quiz name: My test')).toBeInTheDocument();
      expect(getByText('Current quiz category: CUSTOM')).toBeInTheDocument();
      expect(getByText('Current quiz thumbnail')).toBeInTheDocument();
      expect(getByText('OR')).toBeInTheDocument();
      expect(getByText('Edit its questions!')).toBeInTheDocument();
      expect(getAllByRole('textbox')[0]).toHaveValue('My test');
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
