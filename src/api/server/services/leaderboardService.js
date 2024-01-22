import client from '../setup/dbSetup.js';

const getLeaderboard = async (req, res, next) => {
  try {
    const { page } = req.params;
    const offset = (Number(page) - 1) * 100;
    const { rows } = await client.query(
      `select * from public."leaderboardView"
      limit 100
      offset $1`,
      [offset]
    );
    const { rows: leaderCount } = await client.query(
      `select count(*) as leader_count
      from public."leaderboardView"`
    );
    return res.status(200).json({
      leaderboard: rows,
      leaderboard_count: leaderCount[0].leader_count,
    });
  } catch (error) {
    next(error);
  }
};

const leaderboardService = { getLeaderboard };
export default leaderboardService;
