import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import ErrorMessage from './ErrorMessage';
import messages from '../../../api/messages/messages.json';
import { Control, Controller } from 'react-hook-form';
import { QuestionInputs } from '../Forms/input.types';

interface AnswerInputProps extends InputProps {
  error: string | undefined;
  answerNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<QuestionInputs, any>;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  error,
  answerNumber,
  control,
  ...props
}) => {
  return (
    <>
      <Controller
        name={`answer-${answerNumber}`}
        control={control}
        rules={
          answerNumber <= 1
            ? {
                required: messages.fieldRequired,
              }
            : {}
        }
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            autoComplete="on"
            color="secondary"
            variant="faded"
            type="text"
            label={`${messages.answer} ${answerNumber + 1}`}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};

export default AnswerInput;
