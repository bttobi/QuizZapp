import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import { Link } from 'react-router-dom';
import SignInForm from '../components/ui/Forms/SignInForm';
import messages from '../api/messages/messages.json';

const SignInPage = () => {
  return (
    <TabWrapper className="flex flex-col justify-start align-start items-center mt-24">
      <SignInForm />
      <span>{messages.newUser}</span>
      <Link to="/signup" className="underline">
        {messages.clickSignUp}
      </Link>
    </TabWrapper>
  );
};

export default SignInPage;
