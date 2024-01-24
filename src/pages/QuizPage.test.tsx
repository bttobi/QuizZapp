import { Route, Routes } from 'react-router-dom';
import { QuizPage } from '.';
import { fireEvent, render, waitFor } from '../tests/test-utils';

const setup = () =>
  render(
    <Routes>
      <Route path="/quiz/:quizID" element={<QuizPage />} />
    </Routes>,
    { initialEntries: ['/quiz/1'] }
  );

describe('QuizPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays fetched question', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('Question 1 of 2')).toBeInTheDocument();
      expect(getByText('Good one')).toBeInTheDocument();
      expect(getByText('Good job')).toBeInTheDocument();
      expect(getByText('Hehehe')).toBeInTheDocument();
      expect(getByText('I dont care')).toBeInTheDocument();
      expect(getByText('Next')).toBeInTheDocument();
    });
  });

  it('selects question answer', async () => {
    const { container, getByText } = setup();
    await waitFor(() => {
      expect(getByText('Question 1 of 2')).toBeInTheDocument();
      expect(
        container.querySelector('[data-selected]')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(getByText('Good job'));

    await waitFor(() => {
      expect(container.querySelector('[data-selected]')).toBeInTheDocument();
    });
  });

  it('does not go to another question when answer not selected', async () => {
    const { getByText, queryByText } = setup();
    await waitFor(() => {
      expect(getByText('Question 1 of 2')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Next'));

    await waitFor(() => {
      expect(
        getByText('Select answer before going further')
      ).toBeInTheDocument();
      expect(queryByText('Question 2 of 2')).not.toBeInTheDocument();
    });
  });

  it('goes to next question when answer is selected', async () => {
    const { getByText, queryByText } = setup();
    await waitFor(() => {
      expect(getByText('Question 1 of 2')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Good job'));
    fireEvent.click(getByText('Next'));

    await waitFor(() => {
      expect(
        queryByText('Select answer before going further')
      ).not.toBeInTheDocument();
      expect(queryByText('Question 2 of 2')).toBeInTheDocument();
    });
  });

  it('submits answers', async () => {
    const { container, getByText } = setup();
    await waitFor(() => {
      expect(getByText('Question 1 of 2')).toBeInTheDocument();
      expect(
        container.querySelector('[data-selected]')
      ).not.toBeInTheDocument();
    });

    fireEvent.click(getByText('Good job'));
    fireEvent.click(getByText('Next'));

    await waitFor(() => {
      expect(getByText('Question 2 of 2')).toBeInTheDocument();
    });

    fireEvent.click(getByText('correct'));
    fireEvent.click(getByText('Submit answers'));
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
