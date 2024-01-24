import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../App';
import { AuthProvider } from 'react-auth-kit';
import refreshToken from '../api/helpers/refreshToken';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

type CustomRenderOptions = RenderOptions & { initialEntries?: string[] };

export const AllTheProviders = ({
  children,
  initialEntries,
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={import.meta.env.VITE_DOMAIN_SECURED}
        refresh={refreshToken}
      >
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<CustomRenderOptions, 'wrapper'>
) => {
  const initialRoutes = options?.initialEntries || ['/'];
  return render(ui, {
    wrapper: props => (
      <AllTheProviders initialEntries={initialRoutes}>
        {props.children}
        <ToastContainer />
      </AllTheProviders>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
