import React, { useState } from 'react';
import { Button, Checkbox, useDisclosure } from '@nextui-org/react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../Modals/ConfirmationModal';
import messages from '../../../api/messages/messages.json';
import ActionQuestionModal from '../Modals/ActionQuestionModal';
import {
  useDeleteQuestions,
  useEditQuestion,
  useGetEditQuestion,
} from '../../../api/hooks/quiz.hooks';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  readonly checked: boolean;
  readonly questionName: string;
  readonly questionID: number;
  readonly handleSelectQuestion: (questionID: number, checked: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  checked,
  questionName,
  questionID,
  handleSelectQuestion,
}) => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [actionTitle, setActionTitle] = useState<string>('');
  const [actionColor, setActionColor] = useState<'success' | 'danger'>(
    'success'
  );

  const { isPending: isEditPending, editQuestion } = useEditQuestion();

  const {
    isOpen: isDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onOpen: onOpenDelete,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpenChange: onEditOpenChange,
    onOpen: onOpenEdit,
  } = useDisclosure();

  const { questionData, isFetching } = useGetEditQuestion(questionID);
  const { isPending: isDeletePending, deleteQuestions } = useDeleteQuestions();

  const openDelete = () => {
    setModalTitle(messages.deleteQuestion);
    setActionTitle(messages.wantToDelete);
    setActionColor('danger');
    onOpenDelete();
  };

  const openEdit = () => {
    setModalTitle(messages.editQuestion);
    setActionTitle(messages.wantToEdit);
    setActionColor('success');
    onOpenEdit();
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        modalAction={() => deleteQuestions([questionID])}
        modalTitle={modalTitle}
        modalDescription={questionName}
        actionPending={isDeletePending}
        actionTitle={actionTitle}
        actionColor={actionColor}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex cursor-pointer justify-center items-center align-center bg-default p-4 rounded-xl border-3 border-primary flex-grow"
      >
        <Checkbox
          isSelected={checked}
          onChange={e =>
            handleSelectQuestion(questionID, e.currentTarget.checked)
          }
          size="lg"
          className="z-10 bg-primary rounded-lg w-10"
        />
        <span
          className="mx-5"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          {questionName}
        </span>
        <div className="ml-auto flex gap-2">
          <Button isIconOnly onClick={openEdit} color="secondary">
            <FaPen />
          </Button>
          <Button isIconOnly onClick={openDelete} color="danger">
            <FaTrashAlt />
          </Button>
        </div>
      </motion.div>
      {!isFetching && questionData && (
        <ActionQuestionModal
          modalTitle={messages.editQuestionAction}
          actionTitle={messages.editQuestionAction}
          questionName={questionName}
          questionAnswers={questionData?.answers}
          questionCorrectAnswer={questionData?.correct_answer}
          questionID={questionID}
          actionFn={editQuestion}
          isActionPending={isEditPending}
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          isBodyLoading={isFetching}
        />
      )}
    </>
  );
};

export default QuestionCard;
