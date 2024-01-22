import React from 'react';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import QuizCategoryDropdown from '../components/ui/Inputs/QuizCategoryDropdown';
import QuizSearchInput from '../components/ui/Inputs/QuizSearchInput';
import { useState } from 'react';
import QuizList from '../components/ui/Lists/QuizList';
import { Category } from '../api/types/explore.types';
import messages from '../api/messages/messages.json';

const ExplorePage = () => {
  const [quizName, setQuizName] = useState<string | null>('');
  const [quizCategory, setQuizCategory] = useState<Category | null>(null);
  return (
    <TabWrapper className="flex flex-col">
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
          categoryFilter={quizCategory}
          modalTitle={messages.startQuizHeader}
          actionTitle={messages.wantToStart}
        />
      </section>
    </TabWrapper>
  );
};

export default ExplorePage;
