import { useQuery } from '@tanstack/react-query';
import { getLeaderboardRoute } from '../routes/leaderboard.routes';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import messages from '../messages/messages.json';
import { LeaderboardData } from '../types/leaderboard.types';
import axios from 'axios';

export const useGetLeaderboard = (page: number) => {
  const { data, isError, isFetching } = useQuery<LeaderboardData>({
    queryFn: async () =>
      await axios.get(getLeaderboardRoute(page)).then(res => res.data),
    queryKey: ['leaderboard', page],
  });

  if (isError) {
    emitNotification({
      message: messages.errorLeaderboard,
      type: NotificationType.ERROR,
    });
  }

  return {
    leaderboard: data?.leaderboard,
    leaderboardCount: data?.leaderboardCount,
    isFetching,
  };
};
