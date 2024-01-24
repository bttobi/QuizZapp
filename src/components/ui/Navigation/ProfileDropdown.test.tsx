import React from 'react';
import {
  AllTheProviders,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '../../../tests/test-utils';
import ProfileDropdown from './ProfileDropdown';
import { useSignIn } from 'react-auth-kit';

const setUser = renderHook(() => useSignIn(), { wrapper: AllTheProviders });
const setup = () => {
  setUser.result?.current?.({
    token: 'token',
    tokenType: 'Bearer',
    expiresIn: 420,
    refreshToken: 'token',
    refreshTokenExpireIn: 1337,
    authState: {
      email: 'test@gmail.com',
      userID: 1,
      token: 'token',
    },
  });
  return render(<ProfileDropdown />);
};

describe('ProfileDropdown component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays all the user info', async () => {
    const { container, getByText } = setup();
    await waitFor(() => {
      expect(container.querySelector('[data-slot]')).toBeInTheDocument();
    });
    fireEvent.click(container.querySelector('[data-slot]') as HTMLElement);
    await waitFor(() => {
      expect(getByText('Signed in as')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
