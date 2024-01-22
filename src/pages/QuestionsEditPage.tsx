import React from 'react';
import { useCreateQuestion, useGetQuizToEdit } from '../api/hooks/quiz.hooks';
import QuestionsList from '../components/ui/Lists/QuestionsList';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import messages from '../api/messages/messages.json';
import { Button, Spinner, Tooltip, useDisclosure } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import ActionQuestionModal from '../components/ui/Modals/ActionQuestionModal';

const QuestionsEditPage = () => {
  const { isFetching, quizData: quizInfo } = useGetQuizToEdit();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { createQuestion, isPending } = useCreateQuestion();

  return (
    <TabWrapper className="flex flex-col justify-start align-center items-center">
      {isFetching ? (
        <Spinner
          size="lg"
          color="white"
          className="absolute left-1/2 bottom-1/2"
        />
      ) : (
        <>
          <ActionQuestionModal
            modalTitle={messages.addQuestion}
            actionTitle={messages.wantToAddQuestion}
            actionFn={createQuestion}
            isActionPending={isPending}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
          <div className="text-3xl mt-4 flex flex-col justify-center items-center align-center">
            <span className="text-center">{`${messages.currentlyEditing}: `}</span>
            <span className="text-center mt-4">{quizInfo?.quiz_name}</span>
          </div>
          <QuestionsList />
          <Tooltip content={messages.addQuestion}>
            <Button
              size="lg"
              className="fixed bottom-12 right-12 rounded-full text-white text-3xl w-16 h-16"
              isIconOnly
              color="success"
              onClick={onOpen}
            >
              <FaPlus />
            </Button>
          </Tooltip>
        </>
      )}
    </TabWrapper>
  );
};

export default QuestionsEditPage;
