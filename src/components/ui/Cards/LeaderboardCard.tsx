import React from 'react';
import { LeaderboardResult } from '../../../api/types/leaderboard.types';
import { getRankingBgColor } from '../../../helpers/rankingStyling';
import { FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LeaderboardCardProps {
  readonly data: LeaderboardResult;
  readonly isLast: boolean;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ data, isLast }) => {
  const { email, place, points, user_id } = data;
  const navigate = useNavigate();
  return (
    <>
      <motion.li
        whileHover={{ backgroundColor: '#0A2647' }}
        onClick={() => navigate(`/profile/${user_id}`)}
        className={`grid grid-cols-5 gap-4 bg-secondary text-white cursor-pointer justify-center align-center items-center ${getRankingBgColor(
          place
        )} ${!isLast && 'border-b-3 '} border-backgroundSecondary p-2`}
      >
        <span className="text-center">{place}</span>
        <span className="text-center flex justify-center items-center align-center grow-3 col-span-3">
          <span>{place == 1 && <FaTrophy className="mr-2" />}</span>
          <div className="flex flex-wrap justify-center items-center align-center text-center">
            <span>{email.split('@')[0]}</span>
            <span>{`@${email.split('@')[1]}`}</span>
          </div>
          <span>{place == 1 && <FaTrophy className="ml-2" />}</span>
        </span>
        <span className="text-center">{points}</span>
      </motion.li>
      {isLast && <div className="bg-default p-2 rounded-b-xl" />}
    </>
  );
};

export default LeaderboardCard;
