import React from 'react';
import NavigationBar from './NavigationBar';
import { render, waitFor } from '../../../tests/test-utils';
import routes from '../../../appRoutes.routes';

const setup = () =>
  render(<NavigationBar items={routes.filter(el => el.isNavVisible)} />);

describe('NavigationBar component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays all the routes', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('Home')).toBeInTheDocument();
      expect(getByText('Explore')).toBeInTheDocument();
      expect(getByText('Create')).toBeInTheDocument();
      expect(getByText('Leaderboard')).toBeInTheDocument();
      expect(getByText('My quizzes')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
