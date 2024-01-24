import { SignUpPage } from '.';
import { render, waitFor } from '../tests/test-utils';

const setup = () => render(<SignUpPage />);

describe('SignUpPage component', () => {
  it('renders the component', async () => {
    const { container } = setup();
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('displays sign up form', async () => {
    const { getByRole, getByText, getAllByRole } = setup();
    await waitFor(() => {
      expect(getByRole('textbox')).toBeInTheDocument();
      expect(getAllByRole('button')).toHaveLength(4);
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Password')).toBeInTheDocument();
      expect(getByText('Confirm password')).toBeInTheDocument();
      expect(getByText('Existing user?')).toBeInTheDocument();
      expect(getByText('Click here to sign in')).toBeInTheDocument();
      expect(getByText('Sign up')).toBeInTheDocument();
      expect(getByText('Reset form')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
