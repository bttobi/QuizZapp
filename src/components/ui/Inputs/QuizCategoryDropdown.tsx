import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import { Category } from '../../../api/types/explore.types';
import ErrorMessage from './ErrorMessage';
import { Key } from 'react';

interface QuizCategoryDropdownProps {
  value?: Category | null;
  setValue?: React.Dispatch<React.SetStateAction<Category | null>>;
  isRequired?: boolean;
  error?: string;
  variant?: 'flat' | 'faded' | 'bordered' | 'underlined';
  className?: string;
  onSelectionChange: (key: Key) => any;
}

const QuizCategoryDropdown: React.FC<QuizCategoryDropdownProps> = ({
  value,
  onSelectionChange,
  isRequired,
  error,
  variant,
  className,
}) => {
  const categories = Object.keys(Category);
  return (
    <>
      <Autocomplete
        variant={variant}
        isRequired={isRequired}
        selectedKey={value}
        defaultItems={categories as Iterable<object>}
        onSelectionChange={key => onSelectionChange(key)}
        label={messages.quizCategory}
        className={`${className}`}
      >
        {categories.map(category => (
          <AutocompleteItem value={category} key={category}>
            {category}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <ErrorMessage value={error} />
    </>
  );
};

export default QuizCategoryDropdown;
