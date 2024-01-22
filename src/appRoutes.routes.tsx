import { ReactNode } from 'react';
import { MdExplore } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { RequireAuth } from 'react-auth-kit';
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
  QuestionEditPage,
  QuestionsEditPage,
  UserProfilePage,
} from './pages';

export interface RouteType {
  readonly name?: string;
  readonly path: string;
  readonly element: ReactNode;
  readonly isNavVisible: boolean;
  readonly icon?: ReactNode;
}

//TODO: finish this
export const homeRoute = (): string => '/';
// export const exploreRoute

const routes: RouteType[] = [
  {
    name: messages.home,
    path: homeRoute(),
    element: <HomePage />,
    isNavVisible: true,
    icon: <FaHome />,
  },
  {
    name: messages.explore,
    path: '/explore',
    element: (
      <RequireAuth loginPath="/signin">
        <ExplorePage />
      </RequireAuth>
    ),
    isNavVisible: true,
    icon: <MdExplore />,
  },
  {
    name: messages.create,
    path: '/create',
    element: (
      <RequireAuth loginPath="/signin">
        <QuizCreatePage />
      </RequireAuth>
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
      <RequireAuth loginPath="/signin">
        <QuizPage />
      </RequireAuth>
    ),
    isNavVisible: false,
  },
  {
    name: messages.myQuizzes,
    path: '/quizzes',
    element: (
      <RequireAuth loginPath="/signin">
        <UserQuizzesPage />
      </RequireAuth>
    ),
    isNavVisible: true,
    icon: <MdQuiz />,
  },
  {
    path: '/quiz/edit/:quizID',
    element: (
      <RequireAuth loginPath="/signin">
        <QuizEditPage />
      </RequireAuth>
    ),
    isNavVisible: false,
  },
  {
    path: '/questions/edit/:quizID',
    element: (
      <RequireAuth loginPath="/signin">
        <QuestionsEditPage />
      </RequireAuth>
    ),
    isNavVisible: false,
  },
  {
    path: '/question/edit/:questionID',
    element: (
      <RequireAuth loginPath="/signin">
        <QuestionEditPage />
      </RequireAuth>
    ),
    isNavVisible: false,
  },
  {
    path: '/profile/:userID',
    element: (
      <RequireAuth loginPath="/signin">
        <UserProfilePage />
      </RequireAuth>
    ),
    isNavVisible: false,
  },
];

export default routes;
