import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UserAuth, UserRanking } from '../types/user.types';
import messages from '../messages/messages.json';
import errorMessages from '../messages/errors.json';
import {
  signUpUserRoute,
  signInUserRoute,
  signOutUserRoute,
  getUserRanking,
} from '../routes/user.routes';
import parseError from '../helpers/parseError';
import { useSignIn, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import useUser from '../../hooks/useUser';

export const useGetUserRanking = () => {
  const { user } = useUser();
  const {
    data: rankingData,
    refetch,
    isError,
    isFetching,
  } = useQuery<UserRanking>({
    queryFn: async () =>
      await axios.get(getUserRanking(user?.email)).then(res => res.data),
    queryKey: ['userRanking', user?.email],
  });

  if (isError) {
    emitNotification({ message: messages.errorRanking });
  }

  return { rankingData, refetch, isFetching };
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
    mutationFn: async (data: UserAuth) =>
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
          userID: res.data.userID,
          token: res.data.token,
        },
      });
      emitNotification({
        message: messages.successfulSignUp,
        type: NotificationType.SUCCESS,
      });
      navigate('/');
    },
    onError: error => {
      emitNotification({
        message: parseError(error as AxiosError),
        type: NotificationType.ERROR,
      });
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
    mutationFn: async (data: UserAuth) =>
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
          userID: res.data.userID,
          token: res.data.token,
        },
      });
      emitNotification({
        message: messages.successfulSignIn,
        type: NotificationType.SUCCESS,
      });
      navigate('/');
    },
    onError: error => {
      const errorMessage = parseError(error as AxiosError);
      if (
        errorMessage !== errorMessages['INCORRECT_PASSWORD'] &&
        errorMessage !== errorMessages['USER_DOES_NOT_EXIST']
      )
        emitNotification({
          message: errorMessage,
          type: NotificationType.ERROR,
        });
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
      emitNotification({
        message: messages.successfulSignOut,
        type: NotificationType.SUCCESS,
      });
      navigate('/signin');
    },
    onError: () => {
      emitNotification({
        message: errorMessages['SIGNOUT_ERROR'],
        type: NotificationType.ERROR,
      });
    },
  });
  return { signOut, isPending, error };
};
