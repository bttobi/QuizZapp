import { useQuery } from '@tanstack/react-query';
import { getStatsRoute, getUserScoresRoute } from '../routes/score.routes';
import axios from 'axios';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import messages from '../../api/messages/messages.json';
import { AllStatsData, UserScoresData } from '../types/score.types';
import useUser from '../../hooks/useUser';

export const useGetAllUserScores = (userID: number) => {
  const { user } = useUser();
  const {
    data: userScoresData,
    isError,
    isFetching,
  } = useQuery<UserScoresData>({
    queryFn: async () =>
      await axios
        .get(getUserScoresRoute(userID), {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    queryKey: [userID, 'scores'],
  });

  if (isError) {
    emitNotification({
      message: messages.profileError,
      type: NotificationType.ERROR,
    });
  }

  return { userScoresData, isFetching };
};

export const useGetAllStats = () => {
  const { user } = useUser();
  const {
    data: allStatsData,
    isFetching,
    isError,
  } = useQuery<AllStatsData>({
    queryFn: async () =>
      await axios
        .get(getStatsRoute(), {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    queryKey: ['stats'],
  });

  if (isError) {
    emitNotification({
      message: messages.statsError,
      type: NotificationType.ERROR,
    });
  }

  return { allStatsData, isFetching };
};
