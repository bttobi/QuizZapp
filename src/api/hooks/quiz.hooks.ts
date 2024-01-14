import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getQuizRoute,
  getResultsRoute,
  postAnswersRoute,
} from '../routes/quiz.routes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { QuizData, Results } from '../types/quiz.types';
import emitNotification, {
  NotificationType,
} from '../../components/ui/Notifications/emitNotification';
import messages from '../messages/messages.json';

export const useGetQuiz = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const {
    data: quizData,
    refetch,
    isError,
    isFetching,
  } = useQuery<QuizData>({
    queryFn: async () =>
      await axios
        .get(getQuizRoute(Number(quizID || 0)), {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(res => res.data),
    queryKey: ['quiz', quizID, user?.email],
  });

  if (isError) {
    emitNotification({
      message: messages.errorQuizFetch,
      type: NotificationType.ERROR,
    });
  }

  return { quizData, refetch, isError, isFetching };
};

export const useGetResults = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const {
    data: resultsData,
    refetch,
    isFetching,
    isError,
  } = useQuery<Results>({
    queryFn: async () =>
      await axios
        .get(getResultsRoute(Number(quizID || 0), user?.email), {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(res => res.data),
    enabled: false,
    queryKey: ['results', user?.email, quizID],
  });

  if (isError) {
    emitNotification({
      message: messages.submitAnswersError,
      type: NotificationType.ERROR,
    });
  }

  const { mutate: getResults, isPending } = useMutation({
    mutationFn: async (answers: string[]) =>
      axios.post(
        postAnswersRoute(Number(quizID || 0)),
        { answers, user },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      ),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      emitNotification({
        message: messages.submitAnswersError,
        type: NotificationType.ERROR,
      });
    },
  });

  return {
    getResults,
    resultsData,
    isPending: isFetching || isPending,
  };
};
