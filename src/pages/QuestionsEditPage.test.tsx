import { Route, Routes } from 'react-router-dom';
import { QuestionsEditPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () =>
  render(
    <Routes>
      <Route
        path="/questions/edit/:quizID"
        element={<QuestionsEditPage />}
      ></Route>
    </Routes>,
    { initialEntries: ['/questions/edit/1'] }
  );

describe('QuestionsEditPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays fetched questions', async () => {
    const { getAllByRole, getByText } = setup();
    await waitFor(() => {
      expect(getAllByRole('button')).toHaveLength(5);
      expect(getByText('Question')).toBeInTheDocument();
      expect(getByText('Select all questions')).toBeInTheDocument();
      expect(getByText('Delete')).toBeInTheDocument();
      expect(getByText('Currently editing:')).toBeInTheDocument();
      expect(getByText('My test')).toBeInTheDocument();
      expect(getByText('Test?')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
