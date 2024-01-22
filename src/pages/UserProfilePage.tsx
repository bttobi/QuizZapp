import React from 'react';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { useParams } from 'react-router-dom';
import { useGetAllUserScores } from '../api/hooks/score.hooks';
import { Spinner } from '@nextui-org/react';
import messages from '../api/messages/messages.json';
import { AnimatePresence, motion } from 'framer-motion';

const UserProfilePage = () => {
  const { userID } = useParams();
  const { userScoresData, isFetching } = useGetAllUserScores(
    Number(userID || 0)
  );

  const overallProf =
    Math.round((userScoresData?.overall_prof || 0) * 100) / 100;

  const bestProfInQuiz =
    Math.round((userScoresData?.best_prof_quiz || 0) * 100) / 100;

  const bestQuestionProf =
    Math.round((userScoresData?.best_question_prof || 0) * 100) / 100;

  const worstProfInQuiz =
    Math.round((userScoresData?.worst_prof_quiz || 0) * 100) / 100;

  const worstQuestionProf =
    Math.round((userScoresData?.worst_question_prof || 0) * 100) / 100;

  return (
    <TabWrapper className="flex flex-col justify-start items-center align-center">
      {isFetching || !userScoresData ? (
        <Spinner size="lg" color="white" className="absolute bottom-1/2" />
      ) : (
        <AnimatePresence>
          <motion.section
            initial={{ y: '50rem' }}
            animate={{ y: '0rem' }}
            className="flex flex-col gap-4 bg-primary/70 rounded-lg p-4 text-lg text-white mt-8 text-center mx-4 mb-8"
          >
            <p
              //@ts-ignore
              style={{ textWrap: 'wrap' }}
              className="text-3xl bg-background py-4 px-1 rounded-lg flex flex-col"
            >
              <span className="text-2xl">
                {userScoresData?.email.split('@')[0]}
              </span>
              <span className="text-2xl">{messages.profileStats}</span>
            </p>
            {!Object.keys(userScoresData).length ? (
              <span>{messages.noData}</span>
            ) : (
              <>
                <span>{`${messages.attemptCount}: ${
                  userScoresData?.attempt_count || messages.noData
                }`}</span>
                <span>{`${messages.createdQuizzes}: ${
                  userScoresData?.created_quizzes || messages.noData
                }`}</span>
                <span>{`${messages.mostTakenQuiz}: ${
                  userScoresData?.most_taken_quiz || messages.noData
                }`}</span>
                <span>{`${messages.mostTakenCount}: ${
                  userScoresData?.most_taken_count || messages.noData
                }`}</span>
                <span>{`${messages.overallProficiency}: ${overallProf}%`}</span>
                <span className="text-success">{`${messages.bestQuiz}: ${
                  userScoresData?.best_quiz || messages.noData
                }`}</span>
                <span className="text-success">{`${messages.bestProfQuiz}: ${bestProfInQuiz}%`}</span>
                <span className="text-success">{`${messages.bestQuestion}: ${
                  userScoresData?.best_question || messages.noData
                }`}</span>
                <span>{`${messages.bestQuestionProf}: ${bestQuestionProf}%`}</span>
                <span className="text-danger">{`${messages.worstQuiz}: ${
                  userScoresData?.worst_quiz || messages.noData
                }`}</span>
                <span className="text-danger">{`${messages.worstProfQuiz}: ${worstProfInQuiz}%`}</span>
                <span className="text-danger">{`${messages.worstQuestion}: ${
                  userScoresData?.worst_question || messages.noData
                }`}</span>
                <span>{`${messages.worstQuestionProf}: ${worstQuestionProf}%`}</span>
              </>
            )}
          </motion.section>
        </AnimatePresence>
      )}
    </TabWrapper>
  );
};

export default UserProfilePage;
