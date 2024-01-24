import { SignInPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<SignInPage />);

describe('SignInPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays sign in form', async () => {
    const { getByRole, getByText, getAllByRole } = setup();
    await waitFor(() => {
      expect(getByRole('textbox')).toBeInTheDocument();
      expect(getAllByRole('button')).toHaveLength(2);
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Password')).toBeInTheDocument();
      expect(getByText('Sign in')).toBeInTheDocument();
      expect(getByText('New user?')).toBeInTheDocument();
      expect(getByText('Click here to sign up')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
