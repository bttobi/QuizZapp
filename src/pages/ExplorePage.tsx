import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import QuizCathegoryDropdown from '../components/ui/Inputs/QuizCathegoryDropdown';
import QuizSearchInput from '../components/ui/Inputs/QuizSearchInput';
import { useState } from 'react';
import QuizList from '../components/ui/Lists/QuizList';
import { Category } from '../api/types/explore.types';

const ExplorePage = () => {
  const [quizName, setQuizName] = useState<string | null>('');
  const [quizCategory, setQuizCategory] = useState<Category | null>(null);
  return (
    <TabWrapper className="flex flex-col">
      <section className="flex gap-4 sm:gap-10 items-center align-center justify-center h-32">
        <QuizSearchInput value={quizName} setValue={setQuizName} />
        <QuizCathegoryDropdown
          value={quizCategory}
          setValue={setQuizCategory}
        />
      </section>
      <section className="flex items-center justify-center flex-wrap">
        <QuizList nameFilter={quizName} categoryFilter={quizCategory} />
      </section>
    </TabWrapper>
  );
};

export default ExplorePage;
