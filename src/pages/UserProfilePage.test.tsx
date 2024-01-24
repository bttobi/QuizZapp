import { Route, Routes } from 'react-router-dom';
import { UserProfilePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () =>
  render(
    <Routes>
      <Route path="/profile/:userID" element={<UserProfilePage />}></Route>
    </Routes>,
    { initialEntries: ['/profile/1'] }
  );

describe('UserProfilePage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays fetched user stats data', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('All attempts count: 12')).toBeInTheDocument();
      expect(getByText('Number of created quizzes: 2')).toBeInTheDocument();
      expect(getByText('Most attempted quiz: Moj test')).toBeInTheDocument();
      expect(
        getByText('Users proficiency in best question: 100%')
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
