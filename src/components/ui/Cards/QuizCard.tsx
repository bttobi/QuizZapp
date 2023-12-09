import { Card, CardHeader, Image } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';
import messages from '../../../api/messages/messages.json';
import { Category } from '../../../api/types/explore.types';

interface QuizCardProps {
  quizID: number;
  name: string;
  cathegory: Category;
  author: string;
  thumbnailSrc?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quizID,
  name,
  cathegory,
  author,
  thumbnailSrc,
}) => {
  return (
    <Link to={`/quiz/${quizID}/0`}>
      <Card className="col-span-12 sm:col-span-4 h-[150px] hover:scale-110 cursor-pointer">
        <CardHeader className="absolute z-10 top-1 flex-col h-full !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {cathegory}
          </p>
          <h4 className="text-white font-medium text-large">{name}</h4>
          <p className="text-tiny text-white/60 uppercase font-bold absolute right-2 bottom-4">
            {`${messages.createdBy}: ${author}`}
          </p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover brightness-50"
          src={
            thumbnailSrc
              ? thumbnailSrc
              : 'https://i.ytimg.com/vi/cmX1F3U9Xxs/sddefault.jpg'
          }
        />
      </Card>
    </Link>
  );
};

export default QuizCard;
