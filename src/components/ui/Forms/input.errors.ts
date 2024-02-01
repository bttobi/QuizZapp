/* eslint-disable no-useless-escape */
import messages from '../../../api/messages/messages.json';

export const emailErrors = (val: string) => {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val))
    return messages.invalidEmail;
};

export const passwordErrors = (val: string) => {
  if (val.length < 6) return messages.passwordLength;
  if (!/[a-z]/.test(val.toLowerCase())) return messages.passwordLetter;
  if (!/[0-9]/.test(val)) return messages.passwordDigit;
  if (!/[^a-zA-Z0-9]/.test(val)) return messages.passwordSpecial;
};

export const quizNameErrors = (val: string) => {
  if (val.length < 4) return messages.quizNameLengthError;
  if (val.length > 50) return messages.quizNameLengthError;
};

export const quizThumbnailErrors = (val: string) => {
  if (!/(https?:\/\/.*\.(?:png|jpg))/i.test(val) && val !== '')
    return messages.thumbnailLinkError;
};
