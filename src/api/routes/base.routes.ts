export const getBaseRoute = (): string => {
  return process.env.NODE_ENV === 'test'
    ? '/api'
    : `http${import.meta.env.VITE_DOMAIN_SECURED ? 's' : ''}://${
        import.meta.env.VITE_SERVER_HOST
      }${
        !!import.meta.env.VITE_SERVER_PORT
          ? ':' + import.meta.env.VITE_SERVER_PORT
          : ''
      }`;
};
