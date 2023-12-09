import React from 'react';
import AnswerCheckbox from '../Checkboxes/AnswerCheckbox';

interface AnswersProps {
  questionNumber: number;
  answers: string[];
  setUserAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

const Answers: React.FC<AnswersProps> = ({
  questionNumber,
  answers,
  setUserAnswers,
}) => {
  const onChange = (answer: string) => {
    setUserAnswers(prevState => {
      const copyArray = JSON.parse(JSON.stringify(prevState));
      copyArray[questionNumber] = answer;
      return copyArray;
    });
  };

  return (
    <fieldset className="flex flex-col gap-4 sm:mb-10 mb-4 w-full auto-cols-max sm:px-10 px-4">
      {answers.map((answer, index) => (
        <AnswerCheckbox
          index={index}
          answer={answer}
          key={answer}
          onChange={() => onChange(answer)}
        />
      ))}
    </fieldset>
  );
};

export default Answers;
