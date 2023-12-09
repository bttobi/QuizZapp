export const getBaseRoute = (): string =>
  `http${import.meta.env.VITE_DOMAIN_SECURED ? 's' : ''}://${
    import.meta.env.VITE_SERVER_HOST
  }:${import.meta.env.VITE_SERVER_PORT}`;
