import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getExploreRoute } from '../routes/explore.routes';
import useUser from '../../hooks/useUser';
import { Category } from '../types/explore.types';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import messages from '../../api/messages/messages.json';

export const useGetQuizzes = (
  nameFilter: string | null,
  categoryFilter: Category | null,
  page: number
) => {
  const { user } = useUser();
  const {
    refetch,
    isFetching,
    isError,
    data: quizzes,
  } = useQuery({
    queryFn: async () =>
      await axios
        .get(getExploreRoute(page), {
          headers: {
            nameFilter,
            categoryFilter,
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    queryKey: ['explore', page],
    enabled: false,
  });

  if (isError) {
    emitNotification({
      message: messages.errorQuizzesFetch,
      type: NotificationType.ERROR,
    });
  }

  return { quizzes, isFetching, refetch };
};
