import { useForm } from 'react-hook-form';
import { QuizInputs } from './input.types';
import { Category } from '../../../api/types/explore.types';
import QuizThumbnailInput from '../Inputs/QuizThumbnailInput';
import QuizNameInput from '../Inputs/QuizNameInput';
import { Button } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import QuizCategoryDropdown from '../Inputs/QuizCategoryDropdown';
import { useCreateQuiz } from '../../../api/hooks/quiz.hooks';

const CreateQuizForm = () => {
  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<QuizInputs>({
    mode: 'onChange',
    defaultValues: { name: '', category: undefined, thumbnailSrc: '' },
  });
  const { createQuiz, isPending } = useCreateQuiz();

  const onSubmit = () =>
    createQuiz({
      quiz_name: getValues('name'),
      category: getValues('category'),
      thumbnail_src: getValues('thumbnailSrc'),
    });

  return (
    <form
      className="flex flex-col gap-4 rounded-xl px-12 py-6 bg-backgroundSecondary mb-4 mt-4 sm:mt-16 w-3/4 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-lg font-bold ">{messages.createQuiz}</p>
      <QuizNameInput
        isRequired
        isInvalid={!!errors.name?.message}
        control={control}
        error={errors.name?.message}
        resetField={resetField}
      />
      <QuizCategoryDropdown
        error={errors.category?.message}
        variant="faded"
        className="w-full text-secondary"
        isRequired
        onSelectionChange={key => setValue('category', key as Category)}
      />
      <QuizThumbnailInput
        isInvalid={!!errors.thumbnailSrc?.message}
        control={control}
        error={errors.thumbnailSrc?.message}
        resetField={resetField}
      />
      <Button
        className="text-white"
        isDisabled={!!Object.keys(errors).length}
        type="submit"
        color={!!Object.keys(errors).length ? 'danger' : 'success'}
        variant="solid"
        isLoading={isPending}
      >
        {messages.createQuiz}
      </Button>
    </form>
  );
};

export default CreateQuizForm;
