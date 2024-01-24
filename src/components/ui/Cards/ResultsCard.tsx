import React from 'react';
import { useGetCorrectAnswers } from '../../../api/hooks/quiz.hooks';
import { UserAnswer } from '../../../api/types/quiz.types';

interface ResultsCardProps {
  readonly questionID: number;
  readonly userAnswers: UserAnswer[];
  readonly questionAnswers: string[];
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  questionID,
  questionAnswers,
  userAnswers,
}) => {
  const { correctAnswersData } = useGetCorrectAnswers();
  const letters = ['A', 'B', 'C', 'D'];

  const isCorrect = (answer: string) => {
    const correctAnswer = correctAnswersData?.find(
      el => el.question_id == questionID
    )?.answer;

    const userAnswer = userAnswers.find(el => el.question_id === questionID)
      ?.answer;
    if (userAnswer === answer && userAnswer !== correctAnswer)
      return 'text-danger';
    return correctAnswer === answer && 'text-success';
  };

  return (
    <>
      {questionAnswers?.map((answer, answerNumber) => (
        <div
          key={`${crypto.randomUUID()}-${answer}`}
          className={`text-left ${isCorrect(answer)}`}
        >
          <span
            className="flex gap-2 mr-4 sm:text-2xl rounded-full px-2"
            //@ts-expect-error because of textWrap
            style={{ textWrap: 'wrap', wordBreak: 'break-word' }}
          >
            {letters[answerNumber]}
            {/*@ts-expect-error because of textWrap*/}
            <span style={{ textWrap: 'wrap', wordBreak: 'break-word' }}>
              {answer}
            </span>
          </span>
        </div>
      ))}
    </>
  );
};

export default ResultsCard;
