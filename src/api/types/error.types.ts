import errorMessages from '../messages/errors.json';

export type ErrorCode = keyof typeof errorMessages;

export type ErrorMessage = {
  [code in ErrorCode]: string;
};

export interface Error {
  error: (typeof errorMessages)[ErrorCode];
}
