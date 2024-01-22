import React from 'react';
import { useEffect, useState } from 'react';
import {
  useDeleteQuestions,
  useGetQuestions,
} from '../../../api/hooks/quiz.hooks';
import QuestionCard from '../Cards/QuestionCard';
import {
  Button,
  Checkbox,
  Input,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { QuestionData } from '../../../api/types/quiz.types';
import { AnimatePresence, motion } from 'framer-motion';

const QuestionsList = () => {
  const { questions, isFetching } = useGetQuestions();
  const [filteredQuestions, setFilteredQuestions] = useState<
    Omit<Omit<QuestionData, 'answers'>, 'correct_answer'>[]
  >([]);
  const [value, setValue] = useState<string>();
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { isPending, deleteQuestions } = useDeleteQuestions();

  const handleSelectQuestion = (questionID: number, checked: boolean) => {
    if (!selectedQuestions.includes(questionID) && checked)
      setSelectedQuestions(prevState => [...prevState, questionID]);
    if (selectedQuestions.includes(questionID) && !checked)
      setSelectedQuestions(prevState =>
        prevState.filter(el => el != questionID)
      );
  };

  const handleAllSelected = (checked: boolean) => {
    if (checked) {
      setSelectedQuestions(questions?.map(el => el.question_id) || []);
      return;
    }
    setSelectedQuestions([]);
  };

  const modalAction = () => {
    deleteQuestions(selectedQuestions);
    onOpenChange();
  };

  useEffect(() => {
    setFilteredQuestions(
      questions?.filter(el => {
        if (!value) return true;
        return el.question.toLowerCase().includes(value.toLowerCase());
      }) || []
    );
  }, [questions, value]);

  return (
    <>
      {isFetching || !questions ? (
        <Spinner
          size="lg"
          color="white"
          className="absolute left-1/2 bottom-1/2"
        />
      ) : (
        <>
          <ConfirmationModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            modalTitle={messages.deleteSelectedQuestions}
            modalAction={modalAction}
            actionPending={isPending}
            actionColor="danger"
            actionTitle={messages.deleteSelected}
          />
          <section className="flex flex-col gap-4 mt-4 items-center align-center justify-center">
            <Input
              value={value || ''}
              onChange={e => setValue(e.currentTarget.value)}
              label={messages.question}
              isClearable
              onClear={() => setValue('')}
              className="max-w-xs"
            />
            <Checkbox
              isSelected={
                selectedQuestions.length === (questions?.length || false)
              }
              onChange={e => handleAllSelected(e.currentTarget.checked)}
              size="lg"
              className="bg-default-50 rounded-xl flex justify-center align-center items-center"
            >
              <span className="text-sm">{messages.selectAllQuestions}</span>
            </Checkbox>
            <Button
              isLoading={isFetching}
              onClick={onOpen}
              color="danger"
              className="text-white w-48"
              isDisabled={selectedQuestions.length < 1}
            >
              <FaTrashAlt />
              {messages.delete}
            </Button>
          </section>
          <ul className="grid grid-col-1 justify-center items-center align-center gap-4 mt-12 ">
            <AnimatePresence>
              {filteredQuestions
                ?.sort((a, b) =>
                  a.question.length > b.question.length ? 1 : -1
                )
                ?.map(el => (
                  <motion.li
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={`${el.question}-${el.question_id}`}
                  >
                    <QuestionCard
                      checked={selectedQuestions.includes(el.question_id)}
                      handleSelectQuestion={handleSelectQuestion}
                      questionID={el.question_id}
                      questionName={el.question}
                    />
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </>
  );
};

export default QuestionsList;
