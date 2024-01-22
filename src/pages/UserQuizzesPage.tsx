import React from 'react';
import { useState } from 'react';
import QuizCategoryDropdown from '../components/ui/Inputs/QuizCategoryDropdown';
import QuizSearchInput from '../components/ui/Inputs/QuizSearchInput';
import QuizList from '../components/ui/Lists/QuizList';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { Category } from '../api/types/explore.types';
import messages from '../api/messages/messages.json';
import useUser from '../hooks/useUser';

const UserQuizzesPage = () => {
  const [quizName, setQuizName] = useState<string | null>('');
  const [quizCategory, setQuizCategory] = useState<Category | null>(null);
  const { user } = useUser();
  return (
    <TabWrapper className="flex flex-col align-center items-center">
      <div className="text-3xl mt-4">My Quizzes</div>
      <section className="flex gap-4 sm:gap-10 items-center align-center justify-center h-32">
        <QuizSearchInput value={quizName} setValue={setQuizName} />
        <QuizCategoryDropdown
          className="max-w-xs"
          value={quizCategory}
          onSelectionChange={key => setQuizCategory(key as Category)}
        />
      </section>
      <section className="flex items-center justify-center flex-wrap">
        <QuizList
          nameFilter={quizName}
          userFilter={user?.email}
          userID={user?.userID}
          categoryFilter={quizCategory}
          modalTitle={messages.editQuizHeader}
          actionTitle={messages.wantToEdit}
          redirectEdit
          selectable
        />
      </section>
    </TabWrapper>
  );
};

export default UserQuizzesPage;
