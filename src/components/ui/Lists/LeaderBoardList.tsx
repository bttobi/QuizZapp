import React from 'react';
import { useState } from 'react';
import { useGetLeaderboard } from '../../../api/hooks/leaderboard.hooks';
import { Pagination, Spinner } from '@nextui-org/react';
import LeaderboardCard from '../Cards/LeaderboardCard';
import messages from '../../../api/messages/messages.json';
import LeaderBoardListHeader from './LeaderBoardListHeader';

const LeaderBoardList = () => {
  const [page, setPage] = useState<number>(1);
  const { leaderboard, leaderboardCount, isFetching } = useGetLeaderboard(page);
  const fields = [messages.place, messages.user, messages.score];

  return isFetching ? (
    <Spinner
      data-testid="spinner"
      size="lg"
      color="white"
      className="absolute bottom-1/2"
    />
  ) : (
    <>
      <ul className="mt-12 bg-backgroundSecondary h-max-3/4 px-8 pb-8 pt-2 rounded-lg sm:w-1/2">
        <div className="text-3xl mt-4 text-center mb-8">
          {messages.bestPlayers}
        </div>
        {!leaderboard?.length ? (
          <span className="flex justify-center">{messages.noData}</span>
        ) : (
          <>
            <LeaderBoardListHeader fields={fields} />
            {leaderboard?.map((data, index) => (
              <LeaderboardCard
                key={data.email}
                data={data}
                isLast={leaderboard.length - 1 === index}
              />
            ))}
          </>
        )}
      </ul>
      {leaderboardCount && Number(leaderboardCount) !== 0 && (
        <Pagination
          className="fixed sm:bottom-10 bottom-6 z-20 bg-primary rounded-lg"
          showControls
          loop
          color="secondary"
          total={Math.ceil((leaderboardCount || 1) / 10)}
          initialPage={page}
          onChange={page => leaderboardCount && setPage(page)}
        />
      )}
    </>
  );
};

export default LeaderBoardList;
