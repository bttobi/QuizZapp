/**
 * @jest-environment jsdom
 */
import { HomePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<HomePage />);

describe('HomePage component', () => {
  it('displays the HomePage content', async () => {
    const { getByText, getByRole } = setup();
    await waitFor(() => {
      expect(getByRole('button')).toBeDefined();
      expect(
        getByText(/Welcome to our dynamic quiz creation platform - QuizZapp!/i)
      ).toBeDefined();
      expect(getByRole('img')).toBeDefined();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
