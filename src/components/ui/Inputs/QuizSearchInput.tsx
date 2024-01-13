import { Input } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';

interface QuizSearchInputProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const QuizSearchInput: React.FC<QuizSearchInputProps> = ({
  value,
  setValue,
}) => {
  return (
    <Input
      value={value || ''}
      onChange={e => setValue(e.currentTarget.value)}
      label={messages.quizName}
      isClearable
      onClear={() => setValue('')}
      className="max-w-xs"
    >
      QuizSearchInput
    </Input>
  );
};

export default QuizSearchInput;
