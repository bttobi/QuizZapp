import React from 'react';
import { Question } from '../../../api/types/quiz.types';
import messages from '../../../api/messages/messages.json';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import ResultsList from '../Lists/ResultsList';
import { useNavigate } from 'react-router-dom';

interface ResultsPageProps {
  questions: Question[];
  userAnswers: string[];
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
      <ModalContent className="top-24">
        <ModalHeader>{messages.results}</ModalHeader>
        <ModalBody className="p-8">
          <ResultsList questions={questions} userAnswers={userAnswers} />
          <Button
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
