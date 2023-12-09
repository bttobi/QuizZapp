import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import messages from '../../../api/messages/messages.json';
import { Category } from '../../../api/types/explore.types';

interface QuizCathegoryDropdownProps {
  value: Category | null;
  setValue: React.Dispatch<React.SetStateAction<Category | null>>;
}

const QuizCathegoryDropdown: React.FC<QuizCathegoryDropdownProps> = ({
  value,
  setValue,
}) => {
  const categories = Object.keys(Category);
  return (
    <Autocomplete
      value={value || ''}
      defaultItems={categories}
      onSelectionChange={key => setValue(key as Category)}
      label={messages.quizCategory}
      className="max-w-xs"
    >
      {categories.map(category => (
        <AutocompleteItem value={category} key={category}>
          {category}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default QuizCathegoryDropdown;
