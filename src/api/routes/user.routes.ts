import { getBaseRoute } from './base.routes';

export const getUserRoute = (): string => `${getBaseRoute()}/user`;

export const signUpUserRoute = (): string => `${getUserRoute()}/signup`;

export const signInUserRoute = (): string => `${getUserRoute()}/signin`;

export const signOutUserRoute = (): string => `${getUserRoute()}/signout`;

export const refreshUserTokenRoute = (): string => `${getUserRoute()}/token`;

export const getUserRanking = (email: string): string =>
  `${getUserRoute()}/points/${email}`;
