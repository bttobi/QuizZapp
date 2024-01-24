import { useState } from 'react';
import { Question, UserAnswer } from '../../../api/types/quiz.types';
import { Button, Progress } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import Answers from './Answers';
import emitNotification, {
  NotificationType,
} from '../Notifications/emitNotification';
import {
  useGetCorrectAnswers,
  usePostAnswers,
} from '../../../api/hooks/quiz.hooks';
import ResultsModal from '../Modals/ResultsModal';
import Confetti from 'react-confetti';
import { isCorrectlyAnswered } from '../../../helpers/correctAnswers';

interface QuizBodyProps {
  questions: Question[];
}

const QuizBody: React.FC<QuizBodyProps> = ({ questions }) => {
  const { correctAnswersData, getCorrectAnswers, isPending } =
    useGetCorrectAnswers();
  const { postAnswers } = usePostAnswers();
  const [questionNumberState, setQuestionNumberState] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const nextDisabled = !userAnswers[questionNumberState];
  const numberQuestionsMessage = `${messages.question} ${
    questionNumberState + 1
  } ${messages.of} ${questions.length}`;
  const progressValue = 100 * ((questionNumberState + 1) / questions.length);
  const isLastQuestion = progressValue === 100;

  const currentQuestion = questions[questionNumberState];
  const handleNext = () => {
    if (nextDisabled) {
      emitNotification({
        message: messages.selectAnswer,
        type: NotificationType.WARNING,
      });
      return;
    }
    if (!isLastQuestion) {
      setQuestionNumberState(prevState => prevState + 1);
      return;
    }
    getCorrectAnswers().then(res => {
      const userCorrectAnswers: number[] = userAnswers
        .filter(el =>
          isCorrectlyAnswered(res.data || [], userAnswers, el.question_id)
        )
        .map(el => el.question_id);
      const userWrongAnswers: number[] = userAnswers
        .filter(
          el =>
            !isCorrectlyAnswered(res.data || [], userAnswers, el.question_id)
        )
        .map(el => el.question_id);
      postAnswers({
        correctAnswers: userCorrectAnswers,
        wrongAnswers: userWrongAnswers,
      });
    });
  };

  return correctAnswersData ? (
    <>
      <Confetti
        className="z-50"
        recycle={false}
        numberOfPieces={1000}
        gravity={0.05}
      />
      <ResultsModal userAnswers={userAnswers} questions={questions} />
    </>
  ) : (
    <>
      <section className="flex sm:gap-10 gap-2 flex-col justify-between align-center items-center bg-primary w-5/6 rounded-lg">
        <Progress color="secondary" value={progressValue} />
        <span
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
          className="text-lg"
        >
          {numberQuestionsMessage}
        </span>
        <p
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
          className="text-3xl sm:mb-0 mb-4 text-center"
        >
          {currentQuestion.question}
        </p>
        <Answers
          questionID={currentQuestion.question_id}
          questionNumber={questionNumberState}
          setUserAnswers={setUserAnswers}
          answers={currentQuestion.answers}
        />
      </section>
      <Button
        isLoading={isPending}
        color={isLastQuestion ? 'success' : 'default'}
        size="lg"
        onClick={handleNext}
        className="mt-4 text-white"
      >
        {isLastQuestion ? messages.submitAnswers : messages.next}
      </Button>
    </>
  );
};

export default QuizBody;
