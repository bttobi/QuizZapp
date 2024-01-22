import React from 'react';
import { Button } from '@nextui-org/react';
import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import messages from '../../../api/messages/messages.json';
import { useForm } from 'react-hook-form';
import { Inputs } from './input.types';
import { useSignInUser } from '../../../api/hooks/user.hooks';
import errorMessages from '../../../../src/api/messages/errors.json';
import { useEffect } from 'react';

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const email = watch('email');
  const password = watch('password');
  const { signIn, errorMessage, isPending } = useSignInUser();
  const onSubmit = () => {
    signIn({ email, password });
  };

  useEffect(() => {
    if (errorMessage === errorMessages['INCORRECT_PASSWORD'])
      setError('password', { type: 'custom', message: errorMessage });
    else if (errorMessage === errorMessages['USER_DOES_NOT_EXIST'])
      setError('email', { type: 'custom', message: errorMessage });
  }, [errorMessage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-xl p-12 bg-backgroundSecondary mb-4"
    >
      <EmailInput
        control={control}
        error={errors.email?.message}
        isInvalid={!!errors.email?.message}
        onChange={() => clearErrors('email')}
      />
      <PasswordInput
        name={'password'}
        control={control}
        label={messages.password}
        error={errors.password?.message}
        isInvalid={!!errors.password?.message}
      />
      <Button
        className="text-white"
        isDisabled={!!Object.keys(errors).length}
        type="submit"
        color={!!Object.keys(errors).length ? 'danger' : 'success'}
        variant="solid"
        isLoading={isPending}
      >
        {messages.signIn}
      </Button>
    </form>
  );
};

export default SignInForm;
