import { ExplorePage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<ExplorePage />);

describe('ExplorePage component', () => {
  it('displays the ExplorePage content', async () => {
    const { getByText, getByRole } = setup();
    await waitFor(
      () => {
        expect(getByText('Search')).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
