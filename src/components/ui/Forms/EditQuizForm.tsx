import { useForm } from 'react-hook-form';
import { QuizInputs } from './input.types';
import { useEditQuiz, useGetQuizToEdit } from '../../../api/hooks/quiz.hooks';
import messages from '../../../api/messages/messages.json';
import QuizNameInput from '../Inputs/QuizNameInput';
import QuizCategoryDropdown from '../Inputs/QuizCategoryDropdown';
import QuizThumbnailInput from '../Inputs/QuizThumbnailInput';
import { Category } from '../../../api/types/explore.types';
import { Button, Spinner, Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { GiClick } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';

const EditQuizForm = () => {
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
  const { quizID } = useParams();
  const { editQuiz, isPending } = useEditQuiz();
  const { quizData, isFetching } = useGetQuizToEdit();
  const [category, setCategory] = useState<Category | undefined>(
    quizData?.category
  );
  const navigate = useNavigate();

  const onSubmit = () =>
    editQuiz({
      quiz_name: getValues('name'),
      category: category as Category,
      thumbnail_src: getValues('thumbnailSrc'),
    });

  const onCategoryChange = (key: Category) => {
    setCategory(key);
    setValue('category', key);
  };

  useEffect(() => {
    setValue('name', quizData?.quiz_name || '');
    setCategory(quizData?.category as Category);
    setValue('thumbnailSrc', quizData?.thumbnail_src);
  }, [quizData, isFetching]);

  return isFetching ? (
    <Spinner size="lg" color="white" className="absolute bottom-1/2" />
  ) : (
    <form
      className="flex flex-col gap-4 rounded-xl px-12 py-6 bg-backgroundSecondary mb-4 mt-4 sm:mt-16 w-3/4 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col justify-center items-center align-center gap-4">
        <p className="text-lg font-bold text-center">{messages.editQuiz}</p>
        <p className="text-lg font-bold text-center">{`${messages.currentQuizName}: ${quizData?.quiz_name}`}</p>
        <p className="text-lg font-bold text-center">{`${messages.currentQuizCategory}: ${quizData?.category}`}</p>
        <Link target="blank" href={quizData?.thumbnail_src}>
          <p className="text-lg text-center font-bold flex flex-col justify-center items-center">
            {`${messages.currentQuizThumbnail} `}
          </p>
          <GiClick className="animate-bounce text-2xl ml-2 text-white relative" />
        </Link>
      </section>
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
        onSelectionChange={key => onCategoryChange(key as Category)}
        value={category}
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
        {messages.editQuiz}
      </Button>
      {messages.or}
      <Button
        className="text-white"
        color="success"
        variant="solid"
        isLoading={isPending}
        onClick={() => navigate(`/questions/edit/${quizID}`)}
      >
        {messages.editQuestions}
      </Button>
    </form>
  );
};

export default EditQuizForm;
