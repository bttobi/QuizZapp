import React from 'react';
import './AnswerCheckbox.css';
import { motion } from 'framer-motion';

interface AnswerCheckboxProps {
  index: number;
  answer: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const AnswerCheckbox: React.FC<AnswerCheckboxProps> = ({
  index,
  answer,
  onChange,
}) => {
  const letters = 'ABCD';
  return (
    // TODO: animate it better
    <motion.label
      className="flex bg-default rounded-lg cursor-pointer sm:w-full sm:py-6 py-2 px-4 w-full"
      htmlFor={`answer-${index}`}
    >
      <input
        onChange={onChange}
        id={`answer-${index}`}
        name="answer"
        type="radio"
        className="opacity-0 absolute"
      />

      <p className="flex justify-center align-center items-center break-words">
        <span className="mr-4 sm:text-2xl rounded-full px-2">
          {letters[index]}
        </span>
        <span className="text-lg">{answer}</span>
      </p>
    </motion.label>
  );
};

export default AnswerCheckbox;
