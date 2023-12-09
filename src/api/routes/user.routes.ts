import { getBaseRoute } from './base.routes';

export const getUserRoute = () => {
  return `${getBaseRoute()}/user`;
};

export const signUpUserRoute = () => {
  return `${getUserRoute()}/signup`;
};

export const signInUserRoute = () => {
  return `${getUserRoute()}/signin`;
};

export const signOutUserRoute = () => {
  return `${getUserRoute()}/signout`;
};

export const refreshUserTokenRoute = () => {
  return `${getUserRoute()}/token`;
};
