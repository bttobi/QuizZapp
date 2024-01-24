export const getBaseRoute = (): string => {
  return `http${import.meta.env.VITE_DOMAIN_SECURED ? 's' : ''}://${
    import.meta.env.VITE_SERVER_HOST
  }${
    import.meta.env.VITE_SERVER_PORT
      ? ':' + import.meta.env.VITE_SERVER_PORT
      : ''
  }`;
};
