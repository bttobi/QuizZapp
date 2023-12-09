import { ReactNode } from 'react';
import { MdExplore } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';
import messages from './api/messages/messages.json';

import {
  CreatePage,
  ExplorePage,
  HomePage,
  LeaderboardPage,
  SignInPage,
  SignUpPage,
} from './pages';
import QuizPage from './pages/QuizPage';

export interface RouteType {
  readonly name: string;
  readonly path: string;
  readonly element: ReactNode;
  readonly isNavVisible: boolean;
  readonly icon?: ReactNode;
}

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
    element: <ExplorePage />,
    isNavVisible: true,
    icon: <MdExplore />,
  },
  {
    name: messages.create,
    path: '/create',
    element: <CreatePage />,
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
    name: messages.quiz,
    path: '/quiz/:id',
    element: <QuizPage />,
    isNavVisible: false,
  },
];

export default routes;
