import React from 'react';
import { Input, InputProps } from '@nextui-org/react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ErrorMessage from './ErrorMessage';
import { Control, Controller } from 'react-hook-form';
import { passwordErrors } from '../Forms/input.errors';
import messages from '../../../api/messages/messages.json';
import { Inputs } from '../Forms/input.types';

interface PasswordInputProps extends InputProps {
  error: string | undefined;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Inputs, any>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  control,
  name,
  ...props
}) => {
  const [isVisible, setVisible] = useState<boolean>();
  const toggleVisibility = () => setVisible(!isVisible);

  return (
    <>
      <Controller
        name={name as 'password' | 'confirmPassword'}
        control={control}
        rules={{
          required: messages.fieldRequired,
          validate: val => passwordErrors(val as string),
        }}
        render={({ field }) => (
          <Input
            {...field}
            {...props}
            color="secondary"
            variant="faded"
            autoComplete="on"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaEye className="text-secondary" />
                ) : (
                  <FaEyeSlash className="text-secondary" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
          />
        )}
      />
      <ErrorMessage value={error} />
    </>
  );
};
export default PasswordInput;
