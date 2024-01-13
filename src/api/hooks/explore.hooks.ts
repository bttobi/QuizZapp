import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getExploreRoute } from '../routes/explore.routes';
import useUser from '../../hooks/useUser';
import { Category, QuizzesData } from '../types/explore.types';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import messages from '../../api/messages/messages.json';

export const useGetQuizzes = (
  nameFilter: string | null,
  categoryFilter: Category | null,
  page: number,
  userFilter?: string | null,
  userID?: number | null
) => {
  const { user } = useUser();
  const { refetch, isFetching, isError, data } = useQuery<QuizzesData>({
    queryFn: async () =>
      await axios
        .get(getExploreRoute(page), {
          headers: {
            nameFilter,
            categoryFilter,
            userFilter,
            userID,
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    queryKey: ['explore', page, userFilter],
  });

  if (isError) {
    emitNotification({
      message: messages.errorQuizzesFetch,
      type: NotificationType.ERROR,
    });
  }

  return {
    quizzes: data?.quizzes,
    quizzesCount: data?.quizzes_count,
    isFetching,
    refetch,
  };
};
