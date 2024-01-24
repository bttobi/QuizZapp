import React from 'react';
import { Question, UserAnswer } from '../../../api/types/quiz.types';
import { motion } from 'framer-motion';

import messages from '../../../api/messages/messages.json';
import ResultsCard from '../Cards/ResultsCard';
import { FaArrowCircleDown, FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import { useGetCorrectAnswers } from '../../../api/hooks/quiz.hooks';
import { isCorrectlyAnswered } from '../../../helpers/correctAnswers';

interface ResultsListProps {
  readonly questions: Question[];
  readonly userAnswers: UserAnswer[];
}

const ResultsList: React.FC<ResultsListProps> = ({
  questions,
  userAnswers,
}) => {
  const { correctAnswersData } = useGetCorrectAnswers();

  const getQuestionAnswers = (questionID: number) =>
    questions.find(el => el.question_id === questionID)?.answers;

  const isCorrect = (questionID: number) =>
    isCorrectlyAnswered(correctAnswersData || [], userAnswers, questionID);

  const calulateScore = () => {
    const sum = userAnswers.reduce(
      (sum, value) => sum + (isCorrect(value.question_id) ? 1 : 0),
      0
    );
    return sum;
  };

  const percentage = (calulateScore() / questions.length) * 100;

  return (
    <ul className="grid grid-cols-1 overflow-y-auto min-w-96">
      <div className="flex flex-col justify-center items-center gap-4 p-8 border-b-2 border-white">
        <span
          className={`${
            percentage < 50 ? 'text-danger' : 'text-success'
          } font-bold`}
        >{`${messages.earnedPoints}:  ${calulateScore()}/${
          questions.length
        } - ${percentage}%`}</span>
        <FaArrowCircleDown className="w-12 h-12 text-white animate-bounce mt-4" />
      </div>

      {questions.map((el, questionNumber) => (
        <li
          className="mt-8 border-primary border-2 rounded-lg p-2"
          key={`${crypto.randomUUID()}`}
        >
          <p
            className={`text-3xl sm:mb-4 mb-8 text-center ${
              isCorrect(el.question_id) ? 'text-success' : 'text-danger'
            }`}
          >{`${questionNumber + 1}. ${el.question}`}</p>
          <motion.label
            className="flex flex-col text-left bg-default rounded-lg sm:w-full sm:py-6 py-2 px-4 w-full flex-grow"
            htmlFor={`answer-${questionNumber}`}
            aria-label={`answer-${questionNumber}`}
          >
            <ResultsCard
              questionID={el.question_id}
              userAnswers={userAnswers}
              questionAnswers={getQuestionAnswers(el.question_id) || []}
            />
          </motion.label>
          <div className="mt-2">
            {isCorrect(el.question_id) ? (
              <span className="flex justify-center align-center items-center text-success">
                <FaCheckCircle className="mr-2" />
                {messages.rightAnswered}
              </span>
            ) : (
              <span className="flex justify-center align-center items-center text-danger">
                <FaTimesCircle className="mr-2" />
                {messages.wrongAnswered}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
