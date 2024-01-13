import {
  Button,
  Checkbox,
  Image,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import messages from '../../../api/messages/messages.json';
import { QuizType } from '../../../api/types/explore.types';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface QuizCardProps {
  readonly quiz: QuizType;
  readonly modalTitle: string;
  readonly modalDescription?: string;
  readonly actionTitle: string;
  readonly redirectEdit?: boolean;
  readonly selectable?: boolean;
  readonly selected?: boolean;
  handleSelectQuiz?: (quizID: number, checked: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  modalTitle,
  modalDescription,
  actionTitle,
  redirectEdit,
  selectable,
  selected,
  handleSelectQuiz,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { question_count, category, author, thumbnail_src, quiz_name } = quiz;
  const navigate = useNavigate();

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalAction={() =>
          navigate(
            redirectEdit
              ? `/quiz/edit/${quiz.quiz_id}`
              : `/quiz/${quiz.quiz_id}`
          )
        }
        modalTitle={modalTitle}
        modalDescription={modalDescription}
        actionTitle={actionTitle}
      />
      {selectable && (
        <Checkbox
          isSelected={selected}
          onChange={e =>
            handleSelectQuiz?.(quiz.quiz_id, e.currentTarget.checked)
          }
          size="lg"
          className="absolute z-10 bg-primary rounded-lg w-10"
        />
      )}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="light"
          onClick={onOpen}
          className="h-[150px] w-64 transition-all cursor-pointer p-0"
        >
          <Tooltip
            className="z-10"
            content={`${messages.numberOfQuestions}: ${question_count}`}
          >
            <span className="absolute z-30 right-1 border-2 border-white rounded-full px-1 top-1 font-bold">
              {question_count}
            </span>
          </Tooltip>
          <div className="absolute z-10 top-1 flex flex-col h-full p-2 items-center text-wrap">
            <span className="text-tiny text-white/60 uppercase font-bold">
              {category}
            </span>
            <span
              //@ts-ignore
              style={{ textWrap: 'wrap', wordBreak: 'break-all' }}
              className="text-white font-medium text-large h-8 min-w-0"
            >
              {quiz_name}
            </span>
            <span
              className="text-tiny text-white/60 uppercase font-bold relative top-16 text-wrap"
              //@ts-ignore
              style={{ textWrap: 'wrap', wordBreak: 'break-all' }}
            >
              {`${messages.createdBy}: ${author}`}
            </span>
          </div>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover brightness-[0.25]"
            src={
              thumbnail_src
                ? thumbnail_src
                : 'https://i.ytimg.com/vi/cmX1F3U9Xxs/sddefault.jpg'
            }
          />
        </Button>
      </motion.div>
    </>
  );
};

export default QuizCard;
