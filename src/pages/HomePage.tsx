import React from 'react';
import { useNavigate } from 'react-router-dom';
import messages from '../api/messages/messages.json';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { Button, Spinner } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import QuizZappLogo from '../components/ui/Logo/QuizZappLogo';
import { useGetAllStats } from '../api/hooks/score.hooks';

const HomePage = () => {
  const navigate = useNavigate();
  const { allStatsData, isFetching } = useGetAllStats();

  return (
    <TabWrapper>
      <section className="flex gap-20 items-center h-full">
        <article className="flex sm:flex-row sm:text-x3l flex-col justify-center align-center items-center gap-10 w-auto bg-primary/60 p-4 rounded-lg mx-10 text-md text-justify shadow-lg my-4">
          <AnimatePresence>
            <motion.div
              key="logo"
              className="sm:scale-125 scale-100 ml-4 w-full h-full flex justify-center"
              initial={{ y: '5rem' }}
              animate={{ y: '0rem' }}
              whileHover={{ rotate: '-20deg' }}
            >
              <QuizZappLogo
                width={'128px'}
                height={'128px'}
                className="sm:scale-150 scale-100 ml-4"
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col justify-center items-center mx-2 sm:text-2xl text-xl">
            <AnimatePresence>
              <motion.span
                key="description"
                initial={{ x: '5rem' }}
                animate={{ x: '0rem' }}
              >
                {messages.description}
              </motion.span>
              {isFetching || !allStatsData ? (
                <Spinner size="lg" color="white" className="mt-4" />
              ) : (
                <AnimatePresence>
                  <div
                    key="stats"
                    className="flex justify-center items-center flex-col gap-4 mt-4 text-xl p-4 bg-backgroundSecondary/40 rounded-xl text-center"
                  >
                    <motion.span
                      initial={{ x: '5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.usersCount}: ${
                      allStatsData?.users_count || messages.noData
                    }`}</motion.span>
                    <motion.span
                      initial={{ x: '-5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.createdQuizzesCount}: ${
                      allStatsData?.quizzes_count || messages.noData
                    }`}</motion.span>
                    <motion.span
                      initial={{ x: '5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.createdQuestionsCount}: ${
                      allStatsData?.questions_count || messages.noData
                    }`}</motion.span>
                    <motion.span
                      initial={{ x: '-5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.allUsersAttemptsCount}: ${
                      allStatsData?.attempts_count || messages.noData
                    }`}</motion.span>
                    <motion.span
                      initial={{ x: '5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.allGoodAnswersCount}: ${
                      allStatsData?.all_good_answers || messages.noData
                    }`}</motion.span>
                    <motion.span
                      initial={{ x: '-5rem' }}
                      animate={{ x: '0rem' }}
                    >{`${messages.allBadAnswersCount}: ${
                      allStatsData?.all_bad_answers || messages.noData
                    }`}</motion.span>
                  </div>
                </AnimatePresence>
              )}
            </AnimatePresence>
            <Button
              onClick={() => navigate('/explore')}
              className="mt-8 w-48 animate-pulse text-white text-xl"
              variant="solid"
              color="success"
            >
              {messages.getStarted}
            </Button>
          </div>
        </article>
      </section>
    </TabWrapper>
  );
};

export default HomePage;
