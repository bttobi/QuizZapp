import { AxiosError } from 'axios';
import errorMessages from '../messages/errors.json';
import { Error, ErrorCode, ErrorMessage } from '../types/error.types';

type ParseErrorFunction = (error: AxiosError) => string;

const parseError: ParseErrorFunction = (error: AxiosError) => {
  const errors: ErrorMessage = errorMessages;
  const errorCode: ErrorCode = (error?.response?.data as Error)
    ?.error as ErrorCode;
  return errors[errorCode];
};

export default parseError;
