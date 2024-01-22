import React from 'react';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import CreateQuizForm from '../components/ui/Forms/CreateQuizForm';

const QuizCreatePage = () => {
  return (
    <TabWrapper className="flex flex-col align-center items-center">
      <CreateQuizForm />
    </TabWrapper>
  );
};

export default QuizCreatePage;
