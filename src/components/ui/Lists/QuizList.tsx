import React from 'react';
import {
  Button,
  Checkbox,
  Pagination,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { Category, QuizType } from '../../../api/types/explore.types';
import QuizCard from '../Cards/QuizCard';
import { FaSearch } from 'react-icons/fa';
import messages from '../../../api/messages/messages.json';
import { useGetQuizzes } from '../../../api/hooks/explore.hooks';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { useDeleteQuizzes } from '../../../api/hooks/quiz.hooks';
import { AnimatePresence, motion } from 'framer-motion';

const QUIZZES_PER_PAGE = 12;

interface QuizListProps {
  readonly nameFilter: string | null;
  readonly categoryFilter: Category | null;
  readonly userFilter?: string | null;
  readonly userID?: number | null;
  readonly redirectEdit?: boolean;
  readonly modalTitle: string;
  readonly actionTitle: string;
  readonly selectable?: boolean;
}

const QuizList: React.FC<QuizListProps> = ({
  nameFilter,
  categoryFilter,
  userFilter,
  userID,
  redirectEdit,
  modalTitle,
  actionTitle,
  selectable,
}) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [page, setPage] = useState<number>(1);
  const { quizzes, quizzesCount, refetch, isFetching } = useGetQuizzes(
    nameFilter,
    categoryFilter,
    page,
    userFilter,
    userID
  );
  const { deleteQuizzes, isPending } = useDeleteQuizzes();
  const [selectedQuizzes, setSelectedQuizzes] = useState<number[]>([]);

  const handleSelectQuiz = (quizID: number, checked: boolean) => {
    if (!selectedQuizzes.includes(quizID) && checked)
      setSelectedQuizzes(prevState => [...prevState, quizID]);
    if (selectedQuizzes.includes(quizID) && !checked)
      setSelectedQuizzes(prevState => prevState.filter(el => el != quizID));
  };

  const handleAllSelected = (checked: boolean) => {
    if (checked) {
      setSelectedQuizzes(quizzes?.map(el => el.quiz_id) || []);
      return;
    }
    setSelectedQuizzes([]);
  };

  const handleDeletion = () => {
    deleteQuizzes(
      { quizzesIDs: selectedQuizzes },
      {
        onSuccess: () => {
          setSelectedQuizzes([]);
          onOpenChange();
        },
      }
    );
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setSelectedQuizzes([]);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col gap-10 align-center items-center justify-evenly mb-16 mx-2">
      {isFetching ? (
        <Spinner
          size="lg"
          color="white"
          className="absolute left-1/2 bottom-1/2"
        />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <ConfirmationModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              modalAction={handleDeletion}
              modalTitle={messages.sureDelete}
              actionTitle={messages.wantToDelete}
              actionColor={'danger'}
              actionPending={isPending}
            />
            <div className="flex justify-center items-center align-center sm:gap-4 gap-0 sm:flex-row flex-col">
              <Button
                isLoading={isFetching}
                onClick={() => refetch()}
                color="success"
                className="text-white w-48 mb-8"
              >
                <FaSearch />
                {messages.search}
              </Button>
              {selectable && (
                <>
                  <Checkbox
                    isSelected={
                      selectedQuizzes.length === (quizzes?.length || false)
                    }
                    onChange={e => handleAllSelected(e.currentTarget.checked)}
                    size="lg"
                    className="mb-6 bg-default-50 rounded-xl flex justify-center align-center items-center"
                  >
                    <span className="text-sm">{messages.selectAll}</span>
                  </Checkbox>
                  <Button
                    isLoading={isFetching}
                    onClick={onOpen}
                    color="danger"
                    className="text-white w-48 mb-8"
                    isDisabled={selectedQuizzes.length < 1}
                  >
                    <FaTrashAlt />
                    {messages.delete}
                  </Button>
                </>
              )}
            </div>
            <div>
              {quizzes?.length === 0 ? (
                <span>{messages.noResultsFound}</span>
              ) : (
                <ul className="flex items-center justify-center flex-wrap gap-10 pb-20 sm:pb-10">
                  <AnimatePresence>
                    {quizzes?.map((quiz: QuizType) => (
                      <motion.li
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        key={quiz.quiz_id}
                      >
                        <QuizCard
                          selected={selectedQuizzes.includes(quiz.quiz_id)}
                          selectable={selectable}
                          handleSelectQuiz={handleSelectQuiz}
                          redirectEdit={redirectEdit}
                          quiz={quiz}
                          modalTitle={modalTitle}
                          modalDescription={quiz.quiz_name}
                          actionTitle={actionTitle}
                        />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </div>
          <Pagination
            className="fixed sm:bottom-10 bottom-2 z-20 bg-primary rounded-lg"
            showControls
            loop
            color="secondary"
            total={Math.ceil(Number(quizzesCount || 1) / QUIZZES_PER_PAGE)}
            initialPage={page}
            onChange={page => onPageChange(page)}
          />
        </>
      )}
    </div>
  );
};

export default QuizList;
