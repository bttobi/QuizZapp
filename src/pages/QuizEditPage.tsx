import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import EditQuizForm from '../components/ui/Forms/EditQuizForm';

const QuizEditPage = () => {
  return (
    <TabWrapper className="flex flex-col align-center items-center">
      <EditQuizForm />
    </TabWrapper>
  );
};

export default QuizEditPage;
