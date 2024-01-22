import { CorrectAnswer, UserAnswer } from '../api/types/quiz.types';

export const getCorrectQuestionAnswer = (
  correctAnswers: CorrectAnswer[],
  questionID: number
) => {
  return correctAnswers?.find(el => el.question_id == questionID)?.answer;
};

export const isCorrectlyAnswered = (
  correctAnswers: CorrectAnswer[],
  userAnswers: UserAnswer[],
  questionID: number
) => {
  const userAnswer = userAnswers.find(el => el.question_id == questionID)
    ?.answer;
  return getCorrectQuestionAnswer(correctAnswers, questionID) === userAnswer;
};
