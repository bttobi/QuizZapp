import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { useGetQuiz } from '../api/hooks/quiz.hooks';
import { Spinner } from '@nextui-org/react';
import QuizBody from '../components/ui/InteractiveElements/QuizBody';

const QuizPage: React.FC = () => {
  const { quizData, isFetching } = useGetQuiz();

  return (
    <TabWrapper className="flex flex-col align-center justify-start mt-12 items-center">
      {isFetching || !quizData ? (
        <Spinner
          size="lg"
          color="white"
          className="absolute left-1/2 bottom-1/2"
        />
      ) : (
        <QuizBody questions={quizData.questions} />
      )}
    </TabWrapper>
  );
};

export default QuizPage;
