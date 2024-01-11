import React from 'react';
import { Question } from '../../../api/types/quiz.types';
import { motion } from 'framer-motion';
import { useGetResults } from '../../../api/hooks/quiz.hooks';

interface ResultsListProps {
  readonly questions: Question[];
  readonly userAnswers: string[];
}

const ResultsList: React.FC<ResultsListProps> = ({
  questions,
  userAnswers,
}) => {
  const { resultsData } = useGetResults();
  const letters = ['A', 'B', 'C', 'D'];
  const getQuestionAnswers = (questionNumber: number) =>
    questions[questionNumber].answers;
  const isCorrectlyAnswered = (questionNumber: number) =>
    resultsData?.correctAnswers[questionNumber] === userAnswers[questionNumber];

  return (
    <ul className="overflow-y-auto">
      {resultsData?.score}
      {questions.map((el, questionNumber) => (
        <li key={`${crypto.randomUUID()}`}>
          <p className="text-3xl sm:mb-4 mb-8 text-center">{`${
            questionNumber + 1
          }. ${el.question}`}</p>
          <motion.label
            className="flex flex-col text-left bg-default rounded-lg sm:w-full sm:py-6 py-2 px-4 w-full flex-grow"
            htmlFor={`answer-${questionNumber}`}
          >
            {getQuestionAnswers(questionNumber).map((answer, answerNumber) => (
              <p key={crypto.randomUUID() + answer} className="text-left">
                <span
                  className={`mr-4 sm:text-2xl rounded-full px-2 ${
                    isCorrectlyAnswered(questionNumber)
                      ? 'text-success'
                      : 'text-danger'
                  }`}
                >
                  {letters[answerNumber]}
                </span>
                <span
                  className={`text-lg ${
                    isCorrectlyAnswered(questionNumber)
                      ? 'text-success'
                      : 'text-danger'
                  }`}
                >
                  {answer}
                </span>
              </p>
            ))}
          </motion.label>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
