import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getExploreRoute } from '../routes/explore.routes';
import useUser from '../../hooks/useUser';
import { Category } from '../types/explore.types';

export const useGetQuizzes = (
  nameFilter: string | null,
  categoryFilter: Category | null,
  page: number
) => {
  const { user } = useUser();
  const {
    refetch,
    isFetching,
    data: quizzes,
  } = useQuery({
    queryFn: async () =>
      await axios
        .get(getExploreRoute(page), {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(res => res.data),
    queryKey: ['explore', page],
    enabled: false,
  });

  return { quizzes, isFetching, refetch };
};
