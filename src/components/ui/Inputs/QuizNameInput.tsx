import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import { Control, Controller, UseFormResetField } from 'react-hook-form';
import { QuizInputs } from '../Forms/input.types';
import { quizNameErrors } from '../Forms/input.errors';
import ErrorMessage from './ErrorMessage';

interface QuizNameInputProps extends InputProps {
  error: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<QuizInputs, any>;
  resetField: UseFormResetField<QuizInputs>;
}

const QuizNameInput: React.FC<QuizNameInputProps> = ({
  control,
  error,
  resetField,
  ...props
}) => {
  return (
    <>
      <Controller
        name="name"
        control={control}
        rules={{
          required: messages.fieldRequired,
          validate: val => quizNameErrors(val as string),
        }}
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            isClearable
            onClear={() => resetField('name')}
            autoComplete="on"
            color="secondary"
            variant="faded"
            type="text"
            label={messages.quizName}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};

export default QuizNameInput;
