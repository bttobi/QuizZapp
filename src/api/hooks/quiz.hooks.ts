import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postCreateQuestionRoute,
  getEditQuizRoute,
  getQuizRoute,
  getResultsRoute,
  postCreateQuizRoute,
  postDeleteQuizzesRoute,
  postEditQuizRoute,
  postEditQuestionRoute,
  getEditQuestionRoute,
  getQuestionsRoute,
  postDeleteQuestionsRoute,
} from '../routes/quiz.routes';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import {
  CorrectAnswer,
  QuizData,
  Question,
  QuestionData,
} from '../types/quiz.types';
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
  } = useQuery<Question[]>({
    queryFn: async () =>
      await axios
        .get(getQuizRoute(Number(quizID)), {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(res => res.data),
    enabled: !!quizID,
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

export const useGetCorrectAnswers = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const {
    data: correctAnswersData,
    refetch: getCorrectAnswers,
    isFetching,
    isError,
  } = useQuery<CorrectAnswer[]>({
    queryFn: async () =>
      await axios
        .get(getResultsRoute(Number(quizID || 0)), {
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

  return {
    getCorrectAnswers,
    correctAnswersData,
    isPending: isFetching,
  };
};

export const usePostAnswers = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const queryClient = useQueryClient();
  const { mutate: postAnswers } = useMutation({
    mutationFn: async ({
      correctAnswers,
      wrongAnswers,
    }: {
      correctAnswers: number[];
      wrongAnswers: number[];
    }) => {
      return axios.post(
        getResultsRoute(Number(quizID || 0)),
        {
          user_id: user?.userID,
          correctAnswers,
          wrongAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] }),
        queryClient.invalidateQueries({ queryKey: [user?.userID, 'scores'] });
    },
    onError: () => {
      emitNotification({
        message: messages.submitAnswersError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { postAnswers };
};

export const useCreateQuiz = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createQuiz, isPending } = useMutation({
    mutationFn: async ({ quiz_name, category, thumbnail_src }: QuizData) =>
      axios.post(
        postCreateQuizRoute(),
        {
          quiz_name,
          category,
          user_id: user?.userID,
          thumbnail_src,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onSuccess: () => {
      navigate('/quizzes');
      emitNotification({
        message: messages.createQuizSuccess,
        type: NotificationType.SUCCESS,
      });
      queryClient.invalidateQueries({ queryKey: ['explore'] });
    },
    onError: () => {
      emitNotification({
        message: messages.createQuizError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { createQuiz, isPending };
};

export const useDeleteQuizzes = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: deleteQuizzes, isPending } = useMutation({
    mutationFn: async ({ quizzesIDs }: { quizzesIDs: number[] }) =>
      await axios.post(
        postDeleteQuizzesRoute(),
        {
          quizzesIDs,
          user_id: user?.userID,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onError: () => {
      emitNotification({
        message: messages.deleteQuizError,
        type: NotificationType.ERROR,
      });
    },
    onSuccess: () => {
      emitNotification({
        message: messages.deleteQuiz,
        type: NotificationType.SUCCESS,
      });
      queryClient.invalidateQueries({ queryKey: ['explore'] });
    },
  });

  return { deleteQuizzes, isPending };
};

export const useGetQuizToEdit = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const navigate = useNavigate();
  const {
    data: quizData,
    isError,
    isFetching,
  } = useQuery<QuizData>({
    queryFn: async () =>
      await axios
        .get(getEditQuizRoute(Number(quizID)), {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    enabled: !!quizID,
    queryKey: ['edit', quizID],
  });

  if (isError) {
    navigate('/quizzes');
    emitNotification({
      message: messages.editQuizError,
      type: NotificationType.ERROR,
    });
  }

  return { quizData, isFetching };
};

export const useEditQuiz = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editQuiz, isPending } = useMutation({
    mutationFn: async ({ quiz_name, category, thumbnail_src }: QuizData) =>
      await axios.post(
        postEditQuizRoute(Number(quizID || 0)),
        { quiz_name, category, thumbnail_src },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['explore'] });
      queryClient.invalidateQueries({ queryKey: ['edit'] });
      navigate('/quizzes');
      emitNotification({
        message: messages.editQuizSubmit,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      emitNotification({
        message: messages.editQuizError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { editQuiz, isPending };
};

export const useGetQuestions = () => {
  const { quizID } = useParams();
  const {
    data: questions,
    refetch,
    isFetching,
    isError,
  } = useQuery<Omit<Omit<QuestionData, 'answers'>, 'correct_answer'>[]>({
    queryFn: async () =>
      await axios
        .get(getQuestionsRoute(Number(quizID || 0)))
        .then(res => res.data),
    queryKey: ['edit', 'questions', quizID],
  });

  if (isError) {
    emitNotification({
      message: messages.errorQuizFetch,
      type: NotificationType.ERROR,
    });
  }

  return { questions, refetch, isFetching };
};

export const useCreateQuestion = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const queryClient = useQueryClient();
  const { mutate: createQuestion, isPending } = useMutation({
    mutationFn: async ({ question, correct_answer, answers }: QuestionData) =>
      await axios.post(
        postCreateQuestionRoute(Number(quizID || 0)),
        {
          question,
          correct_answer,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['explore'] });
      queryClient.invalidateQueries({
        queryKey: ['edit', 'questions', quizID],
      });
      emitNotification({
        message: messages.addQuestionSuccess,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      emitNotification({
        message: messages.addQuestionError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { createQuestion, isPending };
};

export const useEditQuestion = () => {
  const { user } = useUser();
  const { quizID } = useParams();
  const queryClient = useQueryClient();
  const { mutate: editQuestion, isPending } = useMutation({
    mutationFn: async ({
      question_id,
      question,
      answers,
      correct_answer,
    }: QuestionData) =>
      await axios.post(
        postEditQuestionRoute(Number(quizID || 0), question_id),
        { question_id, question, answers, correct_answer },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['explore'] });
      queryClient.invalidateQueries({
        queryKey: ['edit', 'questions', quizID],
      });
      emitNotification({
        message: messages.editQuestionSuccess,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      emitNotification({
        message: messages.editQuestionError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { editQuestion, isPending };
};

export const useGetEditQuestion = (question_id: number) => {
  const { user } = useUser();
  const { quizID } = useParams();
  const {
    data: questionData,
    refetch: getQuestionToEdit,
    isFetching,
    isError,
  } = useQuery<QuestionData>({
    queryFn: async () =>
      await axios
        .get(getEditQuestionRoute(Number(quizID || 0), question_id), {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then(res => res.data),
    queryKey: ['edit', quizID, question_id],
  });

  if (isError)
    emitNotification({
      message: messages.editQuestionError,
      type: NotificationType.ERROR,
    });

  return { questionData, getQuestionToEdit, isFetching };
};

export const useDeleteQuestions = () => {
  const { quizID } = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteQuestions } = useMutation({
    mutationFn: async (questionsIDs: number[]) =>
      await axios.post(
        postDeleteQuestionsRoute(Number(quizID || 0)),
        { questionsIDs },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ),
    onSuccess: () => {
      emitNotification({
        message: messages.deleteQuestionSuccess,
        type: NotificationType.SUCCESS,
      });
      queryClient.invalidateQueries({ queryKey: ['explore'] });
      queryClient.invalidateQueries({
        queryKey: ['edit', 'questions', quizID],
      });
    },
    onError: () => {
      emitNotification({
        message: messages.deleteQuestionError,
        type: NotificationType.ERROR,
      });
    },
  });

  return { isPending, deleteQuestions };
};
