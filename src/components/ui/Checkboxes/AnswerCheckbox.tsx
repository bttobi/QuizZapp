import React from 'react';
import { motion } from 'framer-motion';
import { Radio, cn } from '@nextui-org/react';

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
    <motion.label htmlFor={`answer-${index}`} id="answerCheckbox">
      <Radio
        onChange={onChange}
        id={`answer-${index}`}
        name={`answer-${index}`}
        type="radio"
        value={answer}
        size="lg"
        color="secondary"
        className={cn(
          'flex m-0 bg-background hover:bg-backgroundSecondary items-center sm:w-full sm:py-6 py-2 px-4 ',
          'max-w-full w-full cursor-pointer rounded-lg gap-4 p-4 border-2',
          'data-[selected=true]:border-success'
        )}
      >
        <p className="flex justify-center align-center items-center break-words">
          <span className="mr-4 sm:text-2xl rounded-full px-2">
            {letters[index]}
          </span>
          <span
            className="text-lg"
            //@ts-ignore
            style={{ textWrap: 'wrap', wordBreak: 'break-all' }}
          >
            {answer}
          </span>
        </p>
      </Radio>
    </motion.label>
  );
};

export default AnswerCheckbox;
