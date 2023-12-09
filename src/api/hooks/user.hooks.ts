import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { User, UserInfo } from '../types/user.types';
import messages from '../messages/messages.json';
import errorMessages from '../messages/errors.json';
import {
  signUpUserRoute,
  getUserRoute,
  signInUserRoute,
  signOutUserRoute,
} from '../routes/user.routes';
import parseError from '../helpers/parseError';
import { useSignIn, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import useUser from '../../hooks/useUser';

export const useGetUser = () => {
  const { data, refetch } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => await axios.get(getUserRoute()).then(res => res.data),
    enabled: false,
  });
  return { data, refetch };
};

export const useSignUpUser = () => {
  const navigate = useNavigate();
  const signInUser = useSignIn();
  const {
    data,
    error,
    isPending,
    mutate: signUpUser,
  } = useMutation({
    mutationFn: async (data: UserInfo) =>
      await axios.post(signUpUserRoute(), data),
    onSuccess: res => {
      signInUser({
        refreshToken: res.data.token,
        refreshTokenExpireIn: 600,
        token: res.data.token,
        expiresIn: import.meta.env.VITE_ACCESS_TOKEN_VALID_TIME,
        tokenType: 'Bearer',
        authState: {
          email: res.data.email,
          token: res.data.token,
        },
      });
      emitNotification(messages.successfulSignUp, NotificationType.SUCCESS);
      navigate('/');
    },
    onError: error => {
      emitNotification(parseError(error as AxiosError), NotificationType.ERROR);
    },
  });
  return {
    data,
    isPending,
    signUpUser,
    errorMessage: parseError(error as AxiosError),
  };
};

export const useSignInUser = () => {
  const signInUser = useSignIn();
  const navigate = useNavigate();
  const {
    isPending,
    error,
    mutate: signIn,
  } = useMutation({
    mutationFn: async (data: UserInfo) =>
      await axios.post(signInUserRoute(), data),
    onSuccess: res => {
      signInUser({
        refreshToken: res.data.token,
        refreshTokenExpireIn: 600,
        token: res.data.token,
        expiresIn: import.meta.env.VITE_ACCESS_TOKEN_VALID_TIME,
        tokenType: 'Bearer',
        authState: {
          email: res.data.email,
          token: res.data.token,
        },
      });
      emitNotification(messages.successfulSignIn, NotificationType.SUCCESS);
      navigate('/');
    },
    onError: error => {
      const errorMessage = parseError(error as AxiosError);
      if (
        errorMessage !== errorMessages['INCORRECT_PASSWORD'] &&
        errorMessage !== errorMessages['USER_DOES_NOT_EXIST']
      )
        emitNotification(errorMessage, NotificationType.ERROR);
    },
  });
  return { signIn, isPending, errorMessage: parseError(error as AxiosError) };
};

export const useSignOutUser = () => {
  const { user } = useUser();
  const signOutUser = useSignOut();
  const navigate = useNavigate();
  const {
    isPending,
    error,
    mutate: signOut,
  } = useMutation({
    mutationFn: async () =>
      await axios.post(
        signOutUserRoute(),
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      ),
    onSuccess: () => {
      signOutUser();
      emitNotification(messages.successfulSignOut, NotificationType.SUCCESS);
      navigate('/signin');
    },
    onError: () => {
      emitNotification(errorMessages['SIGNOUT_ERROR'], NotificationType.ERROR);
    },
  });
  return { signOut, isPending, error };
};
