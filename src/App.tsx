import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/ui/Navigation/NavigationBar';
import routes from './appRoutes.routes';
import { AuthProvider } from 'react-auth-kit';
import refreshToken from './api/helpers/refreshToken';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={import.meta.env.VITE_DOMAIN_SECURED}
        refresh={refreshToken}
      >
        <HashRouter basename="/">
          <NavigationBar items={routes.filter(el => el.isNavVisible)} />
          <Routes>
            {routes.map(route => (
              <Route
                key={`${route.path}-${route.name}`}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
