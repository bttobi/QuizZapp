import TabWrapper from '../components/ui/Wrappers/TabWrapper';
import LeaderBoardList from '../components/ui/Lists/LeaderBoardList';

const LeaderboardPage = () => {
  return (
    <TabWrapper className="flex flex-col justify-start align-center items-center">
      <LeaderBoardList />
    </TabWrapper>
  );
};

export default LeaderboardPage;
