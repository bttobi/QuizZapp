import React from 'react';
import AnswerCheckbox from '../Checkboxes/AnswerCheckbox';
import { UserAnswer } from '../../../api/types/quiz.types';
import { RadioGroup } from '@nextui-org/react';

interface AnswersProps {
  questionNumber: number;
  questionID: number;
  answers: string[];
  setUserAnswers: React.Dispatch<React.SetStateAction<UserAnswer[]>>;
}

const Answers: React.FC<AnswersProps> = ({
  questionNumber,
  questionID,
  answers,
  setUserAnswers,
}) => {
  const onChange = (answer: string) => {
    setUserAnswers(prevState => {
      const copyArray = JSON.parse(JSON.stringify(prevState));
      copyArray[questionNumber] = { question_id: questionID, answer };
      return copyArray;
    });
  };

  return (
    <RadioGroup className="flex flex-col gap-4 sm:mb-10 mb-4 w-full auto-cols-max sm:px-10 px-4">
      {answers.map((answer, index) => (
        <AnswerCheckbox
          index={index}
          answer={answer}
          key={answer}
          onChange={() => onChange(answer)}
        />
      ))}
    </RadioGroup>
  );
};

export default Answers;
