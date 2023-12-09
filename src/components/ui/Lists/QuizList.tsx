import { Button, Pagination, Spinner } from '@nextui-org/react';
import { Category, QuizType } from '../../../api/types/explore.types';
import QuizCard from '../Cards/QuizCard';
import { FaSearch } from 'react-icons/fa';
import messages from '../../../api/messages/messages.json';
import { useGetQuizzes } from '../../../api/hooks/explore.hooks';
import { useEffect, useState } from 'react';

interface QuizListProps {
  readonly nameFilter: string | null;
  readonly categoryFilter: Category | null;
}

const QuizList: React.FC<QuizListProps> = ({ nameFilter, categoryFilter }) => {
  const [page, setPage] = useState<number>(1);
  const { quizzes, refetch, isFetching } = useGetQuizzes(
    nameFilter,
    categoryFilter,
    page
  );
  console.log(Math.ceil(quizzes?.length / 12));

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col gap-10 align-center items-center justify-evenly">
      {isFetching ? (
        <Spinner
          size="lg"
          color="white"
          className="absolute left-1/2 bottom-1/2"
        />
      ) : (
        <>
          <Button
            isLoading={isFetching}
            onClick={() => refetch()}
            color="success"
            className="text-white w-48"
          >
            <FaSearch />
            {messages.search}
          </Button>
          <ul className="flex items-center justify-center flex-wrap gap-10 pb-20 sm:pb-10">
            {quizzes?.map((quiz: QuizType) => (
              <li key={quiz.quizID}>
                <QuizCard
                  quizID={quiz.quizID}
                  name={quiz.name}
                  cathegory={quiz.category}
                  author={quiz.author}
                  thumbnailSrc={quiz.thumbnailSrc}
                />
              </li>
            ))}
          </ul>
          <Pagination
            className="fixed sm:bottom-10 bottom-2 z-20 bg-primary rounded-lg"
            showControls
            loop
            color="secondary"
            total={Math.ceil((quizzes?.length || 1) / 12)}
            initialPage={page}
            onChange={page => setPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default QuizList;
