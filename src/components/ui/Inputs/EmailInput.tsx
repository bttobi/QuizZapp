import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import ErrorMessage from './ErrorMessage';
import messages from '../../../api/messages/messages.json';
import { Control, Controller } from 'react-hook-form';
import { emailErrors } from '../Forms/input.errors';
import { Inputs } from '../Forms/input.types';

interface EmailInputProps extends InputProps {
  error: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Inputs, any>;
}

const EmailInput: React.FC<EmailInputProps> = ({
  error,
  control,
  ...props
}) => {
  return (
    <>
      <Controller
        name="email"
        control={control}
        rules={{
          required: messages.fieldRequired,
          validate: val => emailErrors(val as string),
        }}
        render={({ field }) => (
          <Input
            {...props}
            {...field}
            autoComplete="on"
            color="secondary"
            variant="faded"
            type="email"
            label={messages.email}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};

export default EmailInput;
