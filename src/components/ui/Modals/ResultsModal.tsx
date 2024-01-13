import React from 'react';
import { Question, UserAnswer } from '../../../api/types/quiz.types';
import messages from '../../../api/messages/messages.json';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  cn,
} from '@nextui-org/react';
import ResultsList from '../Lists/ResultsList';
import { useNavigate } from 'react-router-dom';

interface ResultsPageProps {
  questions: Question[];
  userAnswers: UserAnswer[];
}

const ResultsModal: React.FC<ResultsPageProps> = ({
  questions,
  userAnswers,
}) => {
  const navigate = useNavigate();

  return (
    <Modal
      defaultOpen
      hideCloseButton
      isDismissable={false}
      className="items-center absolute"
    >
      <ModalContent className="sm:top-12 top-0 sm:rounded-lg rounded-none sm:m-1 m-0">
        <ModalHeader>{messages.results}</ModalHeader>
        <ModalBody
          className={cn('p-0 overflow-x-hidden flex flex-col items-center')}
        >
          <ResultsList questions={questions} userAnswers={userAnswers} />
          <Button
            className="my-4"
            onClick={() => {
              navigate('/explore');
              // this reload forces to invalidate all caches
              window.location.reload();
            }}
            color="primary"
          >
            {messages.goBack}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResultsModal;
