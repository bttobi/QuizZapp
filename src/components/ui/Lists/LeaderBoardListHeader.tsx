import React from 'react';

interface LeaderBoardListHeaderProps {
  fields: string[];
}

const LeaderBoardListHeader: React.FC<LeaderBoardListHeaderProps> = ({
  fields,
}) => {
  return (
    <div
      className={`grid grid-cols-${
        fields.length + 2
      } grid-rows-1 justify-center bg-default rounded-t-xl`}
    >
      {fields.map(field => (
        <span
          key={field}
          className={`${field === 'User' && 'col-span-3'} text-center px-2`}
        >
          {field}
        </span>
      ))}
    </div>
  );
};

export default LeaderBoardListHeader;
