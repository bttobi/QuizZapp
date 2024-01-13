import { Button } from '@nextui-org/react';
import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import messages from '../../../api/messages/messages.json';
import { useForm } from 'react-hook-form';
import { Inputs } from './input.types';
import ErrorMessage from '../Inputs/ErrorMessage';
import { useSignUpUser } from '../../../api/hooks/user.hooks';
import { useEffect } from 'react';

const SignUpForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch = password === confirmPassword;
  const { signUpUser, errorMessage, isPending } = useSignUpUser();
  const onSubmit = () => {
    signUpUser({ email, password });
  };

  useEffect(() => {
    if (!!errorMessage)
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
      <PasswordInput
        name={'confirmPassword'}
        control={control}
        label={messages.confirmPassword}
        error={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword?.message}
      />
      {!passwordsMatch && <ErrorMessage value={messages.passwordsDoNotMatch} />}
      <Button
        className="text-white"
        isDisabled={!!Object.keys(errors).length || !passwordsMatch}
        type="submit"
        color={!!Object.keys(errors).length ? 'danger' : 'success'}
        variant="solid"
        isLoading={isPending}
      >
        {messages.signUp}
      </Button>
      <Button color="secondary" variant="solid" onClick={() => reset()}>
        {messages.resetForm}
      </Button>
    </form>
  );
};

export default SignUpForm;
