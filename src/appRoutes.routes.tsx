import React, { ReactNode } from 'react';
import { MdExplore } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useIsAuthenticated } from 'react-auth-kit';
import { MdQuiz } from 'react-icons/md';
import messages from './api/messages/messages.json';

import {
  QuizCreatePage,
  ExplorePage,
  HomePage,
  LeaderboardPage,
  SignInPage,
  SignUpPage,
  QuizPage,
  UserQuizzesPage,
  QuizEditPage,
  QuestionsEditPage,
  UserProfilePage,
} from './pages';
import { Navigate } from 'react-router-dom';

export interface RouteType {
  readonly name?: string;
  readonly path: string;
  readonly element: ReactNode;
  readonly isNavVisible: boolean;
  readonly icon?: ReactNode;
}

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  if (auth === undefined) {
    return null;
  }
  return auth ? <>{children}</> : <Navigate to="/signin" />;
};

const routes: RouteType[] = [
  {
    name: messages.home,
    path: '/',
    element: <HomePage />,
    isNavVisible: true,
    icon: <FaHome />,
  },
  {
    name: messages.explore,
    path: '/explore',
    element: (
      <PrivateRoute>
        <ExplorePage />
      </PrivateRoute>
    ),
    isNavVisible: true,
    icon: <MdExplore />,
  },
  {
    name: messages.create,
    path: '/create',
    element: (
      <PrivateRoute>
        <QuizCreatePage />
      </PrivateRoute>
    ),
    isNavVisible: true,
    icon: <FaPen />,
  },
  {
    name: messages.leaderboard,
    path: '/leaderboard',
    element: <LeaderboardPage />,
    isNavVisible: true,
    icon: <FaTrophy />,
  },
  {
    name: messages.signIn,
    path: '/signin',
    element: <SignInPage />,
    isNavVisible: false,
    icon: <FaSignInAlt />,
  },
  {
    name: messages.signUp,
    path: '/signup',
    element: <SignUpPage />,
    isNavVisible: false,
    icon: <IoPersonCircleOutline />,
  },
  {
    path: '/quiz/:quizID',
    element: (
      <PrivateRoute>
        <QuizPage />
      </PrivateRoute>
    ),
    isNavVisible: false,
  },
  {
    name: messages.myQuizzes,
    path: '/quizzes',
    element: (
      <PrivateRoute>
        <UserQuizzesPage />
      </PrivateRoute>
    ),
    isNavVisible: true,
    icon: <MdQuiz />,
  },
  {
    path: '/quiz/edit/:quizID',
    element: (
      <PrivateRoute>
        <QuizEditPage />
      </PrivateRoute>
    ),
    isNavVisible: false,
  },
  {
    path: '/questions/edit/:quizID',
    element: (
      <PrivateRoute>
        <QuestionsEditPage />
      </PrivateRoute>
    ),
    isNavVisible: false,
  },
  {
    path: '/profile/:userID',
    element: (
      <PrivateRoute>
        <UserProfilePage />
      </PrivateRoute>
    ),
    isNavVisible: false,
  },
  {
    path: '*',
    element: <HomePage />,
    isNavVisible: false,
  },
];

export default routes;
