import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuizRoute, getResultsRoute } from '../routes/quiz.routes';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { QuizData } from '../types/quiz.types';
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
  const navigate = useNavigate();
  const {
    mutate: getResults,
    data: resultsData,
    isPending,
  } = useMutation({
    mutationFn: async (answers: string[]) =>
      axios.post(
        getResultsRoute(Number(quizID || 0)),
        { answers, user },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      ),
    onSuccess: () => {
      navigate(`/results/${quizID}`);
    },
    onError: () => {
      emitNotification({
        message: messages.submitAnswersError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { getResults, resultsData, isPending };
};
