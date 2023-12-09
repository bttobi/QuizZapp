import React, { useState } from 'react';
import { Question } from '../../../api/types/quiz.types';
import { Button, Image, Progress } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import Answers from './Answers';
import { useNavigate, useParams } from 'react-router-dom';
import emitNotification, {
  NotificationType,
} from '../Notifications/emitNotification';
import { useGetResults } from '../../../api/hooks/quiz.hooks';

interface QuizBodyProps {
  questions: Question[];
}

const QuizBody: React.FC<QuizBodyProps> = ({ questions }) => {
  const { quizID, questionNumber } = useParams();
  const { getResults, isPending } = useGetResults();
  const navigate = useNavigate();
  const [questionNumberState, setQuestionNumberState] = useState<number>(
    Number(questionNumber || 0)
  );
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const nextDisabled = !userAnswers[questionNumberState];
  const numberQuestionsMessage = `${messages.question} ${
    questionNumberState + 1
  } ${messages.of} ${questions.length}`;
  const progressValue = 100 * ((questionNumberState + 1) / questions.length);
  const isLastQuestion = progressValue === 100;

  console.log(userAnswers);
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
      setQuestionNumberState(prevState => {
        const newQuestioNumber = prevState + 1;
        navigate(`/quiz/${quizID}/${newQuestioNumber}`);
        return newQuestioNumber;
      });
      return;
    }
    getResults(userAnswers);
  };

  return (
    <>
      <section className="flex sm:gap-10 gap-2 flex-col justify-between align-center items-center bg-primary w-5/6 rounded-lg">
        <Progress color="secondary" value={progressValue} />
        <p className="text-lg">{numberQuestionsMessage}</p>
        {/* <Image
          className="sm:w-96 w-64"
          src={
            'https://cdn.cloudflare.steamstatic.com/steam/apps/322170/capsule_616x353.jpg?t=1703006148'
          }
        /> */}
        <p className="text-3xl sm:mb-0 mb-4">{currentQuestion.question}</p>
        <Answers
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
