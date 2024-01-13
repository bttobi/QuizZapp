import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import ErrorMessage from './ErrorMessage';
import messages from '../../../api/messages/messages.json';
import { Control, Controller } from 'react-hook-form';
import { QuestionInputs } from '../Forms/input.types';
import { useGetQuiz } from '../../../api/hooks/quiz.hooks';

interface QuestionInputProps extends InputProps {
  error: string | undefined;
  control: Control<QuestionInputs, any>;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  error,
  control,
  ...props
}) => {
  const { quizData: quizQuestions } = useGetQuiz();
  const questions = quizQuestions?.map(el => el.question.toLowerCase());
  return (
    <>
      <Controller
        name="question"
        control={control}
        rules={{
          required: messages.fieldRequired,
          validate: (val: string) => {
            if (questions?.includes(val)) return messages.questionNameAlrTaken;
          },
        }}
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            autoComplete="on"
            color="secondary"
            variant="faded"
            type="text"
            label={messages.question}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};

export default QuestionInput;
