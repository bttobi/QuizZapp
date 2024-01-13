import { Input, InputProps } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import { Control, Controller, UseFormResetField } from 'react-hook-form';
import { QuizInputs } from '../Forms/input.types';
import ErrorMessage from './ErrorMessage';
import { quizThumbnailErrors } from '../Forms/input.errors';

interface QuizThumbnailInputProps extends InputProps {
  error: string | undefined;
  control: Control<QuizInputs, any>;
  resetField: UseFormResetField<QuizInputs>;
}

const QuizThumbnailInput: React.FC<QuizThumbnailInputProps> = ({
  control,
  error,
  resetField,
  ...props
}) => {
  return (
    <>
      <Controller
        name="thumbnailSrc"
        control={control}
        rules={{
          validate: val => quizThumbnailErrors(val as string),
        }}
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            autoComplete="on"
            isClearable
            onClear={() => resetField('thumbnailSrc')}
            color="secondary"
            variant="faded"
            type="text"
            label={messages.thumbnailLink}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};

export default QuizThumbnailInput;
