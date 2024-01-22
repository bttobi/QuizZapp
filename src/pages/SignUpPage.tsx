import React from 'react';
import { Link } from 'react-router-dom';
import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import SignUpForm from '../components/ui/Forms/SignUpForm';
import messages from '../api/messages/messages.json';

const SignUpPage = () => {
  return (
    <TabWrapper className="flex flex-col justify-start align-start items-center mt-24">
      <SignUpForm />
      <span>{messages.existingUser}</span>
      <Link to="/signin" className="underline">
        {messages.clickSignIn}
      </Link>
    </TabWrapper>
  );
};

export default SignUpPage;
