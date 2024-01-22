import React, { useEffect, useState } from 'react';
import messages from '../../../api/messages/messages.json';
import { useForm, useWatch } from 'react-hook-form';
import { QuestionInputs } from '../Forms/input.types';
import QuestionInput from '../Inputs/QuestionInput';
import AnswerInput from '../Inputs/AnswerInput';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  cn,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { QuestionData } from '../../../api/types/quiz.types';
import ErrorMessage from '../Inputs/ErrorMessage';

interface ActionQuestionModalProps {
  modalTitle: string;
  actionTitle: string;
  actionFn: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    QuestionData,
    unknown
  >;
  isActionPending: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
  questionName?: string;
  questionAnswers?: string[];
  questionCorrectAnswer?: string;
  questionID?: number;
  isBodyLoading?: boolean;
}

const ActionQuestionModal: React.FC<ActionQuestionModalProps> = ({
  modalTitle,
  actionTitle,
  questionName,
  questionCorrectAnswer,
  actionFn,
  isActionPending,
  questionAnswers,
  isOpen,
  onOpenChange,
  questionID,
  isBodyLoading,
}) => {
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<QuestionInputs>({
    mode: 'onChange',
    defaultValues: {
      question: questionName || '',
      ['answer-0']: questionAnswers?.[0] || '',
      ['answer-1']: questionAnswers?.[1] || '',
      ['answer-2']: questionAnswers?.[2] || '',
      ['answer-3']: questionAnswers?.[3] || '',
    },
  });

  const watchedFields = useWatch({ control });

  const findKeyByVal = () => {
    return Object.keys(getValues()).find(
      key => getValues()[key] === questionCorrectAnswer
    );
  };

  const getAnswerField = (answerNumber: number) => `answer-${answerNumber}`;

  const currentAnswers = [
    getValues(getAnswerField(0)),
    getValues(getAnswerField(1)),
    getValues(getAnswerField(2)),
    getValues(getAnswerField(3)),
  ].filter(el => el !== '');

  const [correctAnswer, setCorrectAnswer] = useState<string>(
    findKeyByVal() || getAnswerField(0)
  );

  const checkForDuplicateAns = () => {
    return new Set(currentAnswers).size !== currentAnswers.length;
  };

  const handleOpen = () => {
    onOpenChange();
    reset();
  };

  const onSubmit = (values: QuestionInputs) => {
    const dataToSend: QuestionData = {
      question: values.question,
      correct_answer: values[correctAnswer],
      answers: currentAnswers,
      question_id: questionID || -1,
    };

    actionFn(dataToSend);
    handleOpen();
    reset();
  };

  useEffect(() => {
    clearErrors(['duplicateAns', 'emptyCorrectAns']);
    if (checkForDuplicateAns()) {
      setError('duplicateAns', {
        message: messages.answersDuplicateError,
        type: 'onChange',
      });
    }
    if (getValues(correctAnswer) === '') {
      setError('emptyCorrectAns', {
        message: messages.emptyCorrectError,
        type: 'onChange',
      });
    }
  }, [watchedFields, clearErrors, correctAnswer]);

  return (
    <Modal
      className="items-center absolute w-full"
      isOpen={isOpen}
      onOpenChange={handleOpen}
    >
      <ModalContent className="sm:top-12 top-0 sm:rounded-lg rounded-none sm:m-1 m-0 sm:w-auto w-full sm:h-auto h-full">
        <ModalHeader className="border-white border-b-2 w-full text-center flex justify-center">
          {modalTitle}
        </ModalHeader>
        <ModalBody
          className={cn(
            'p-0 overflow-x-hidden flex flex-col items-center px-4 mt-4'
          )}
        >
          {isBodyLoading ? (
            <Spinner />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 justify-center items-center align-around text-center"
            >
              <QuestionInput
                isRequired
                isInvalid={!!errors?.question?.message}
                error={errors.question?.message}
                control={control}
                isClearable
                onClear={() => resetField('question')}
              />
              <p className="mt-8">{`${messages.answers}: `}</p>
              <span className="flex justify-center items-center align-center italic text-sm">
                {messages.correctAnswerTip}
              </span>
              <span className="flex justify-center items-center align-center italic text-sm mb-4">
                {messages.only2Answers}
              </span>
              <ErrorMessage value={errors.duplicateAns?.message} />
              <ErrorMessage value={errors.emptyCorrectAns?.message} />
              <AnimatePresence>
                <RadioGroup
                  className="w-full"
                  defaultValue={findKeyByVal() || getAnswerField(0)}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex justify-center items-center gap-2 p-4 rounded-lg border-white border-2"
                  >
                    <Radio
                      onChange={e => setCorrectAnswer(e.currentTarget.value)}
                      value={getAnswerField(0)}
                      color="success"
                      size="lg"
                    />
                    <AnswerInput
                      value={questionAnswers?.[0] || ''}
                      isRequired
                      isInvalid={!!errors?.[getAnswerField(0)]?.message}
                      error={errors?.[getAnswerField(0)]?.message}
                      control={control}
                      answerNumber={0}
                      isClearable
                      onClear={() => resetField(getAnswerField(0))}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex justify-center items-center gap-2 p-4 rounded-lg border-white border-2"
                  >
                    <Radio
                      onChange={e => setCorrectAnswer(e.currentTarget.value)}
                      value={getAnswerField(1)}
                      color="success"
                      size="lg"
                    />
                    <AnswerInput
                      value={questionAnswers?.[1] || ''}
                      isRequired
                      isInvalid={!!errors?.[getAnswerField(1)]?.message}
                      error={errors?.[getAnswerField(1)]?.message}
                      control={control}
                      answerNumber={1}
                      isClearable
                      onClear={() => resetField(getAnswerField(1))}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex justify-center items-center gap-2 p-4 rounded-lg border-white border-2"
                  >
                    <Radio
                      onChange={e => setCorrectAnswer(e.currentTarget.value)}
                      value={getAnswerField(2)}
                      color="success"
                      size="lg"
                    />
                    <AnswerInput
                      value={questionAnswers?.[2] || ''}
                      isInvalid={!!errors?.[getAnswerField(2)]?.message}
                      error={errors?.[getAnswerField(2)]?.message}
                      control={control}
                      answerNumber={2}
                      isClearable
                      onClear={() => resetField(getAnswerField(2))}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex justify-center items-center gap-2 p-4 rounded-lg border-white border-2"
                  >
                    <Radio
                      onChange={e => setCorrectAnswer(e.currentTarget.value)}
                      value={getAnswerField(3)}
                      color="success"
                      size="lg"
                    />
                    <AnswerInput
                      value={questionAnswers?.[3] || ''}
                      isInvalid={!!errors?.[getAnswerField(3)]?.message}
                      error={errors?.[getAnswerField(3)]?.message}
                      control={control}
                      answerNumber={3}
                      isClearable
                      onClear={() => resetField(getAnswerField(3))}
                    />
                  </motion.div>
                </RadioGroup>
              </AnimatePresence>
              <Button
                className="text-white w-min mt-4 mb-4"
                isDisabled={!!Object.keys(errors).length}
                type="submit"
                color={!!Object.keys(errors).length ? 'danger' : 'success'}
                variant="solid"
                isLoading={isActionPending}
              >
                {actionTitle}
              </Button>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ActionQuestionModal;
