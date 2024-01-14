import client from "../setup/dbSetup.js";

const getLeaderboard = async (req, res, next) => {
  try {
    const { page } = req.params;
    const offset = (Number(page) - 1) * 100;
    const { rows } = await client.query(
      `SELECT 
        ROW_NUMBER () OVER (ORDER BY POINTS desc) as place
        ,email
        ,points
      from
      (select user_id, COALESCE(sum(points), 0) AS POINTS from leaderboard group by 1) a 
      join 
      (select user_id, email from users) b
      on a.user_id=b.user_id
      limit 100
      offset $1`,
      [offset]
    );
    const { rows: leaderCount } = await client.query(
      `select count(*) as leaderCount
      from (select distinct user_id from leaderboard)`
    );
    return res.status(200).json({
      leaderboard: rows,
      leaderboardCount: leaderCount[0].leadercount,
    });
  } catch (error) {
    next(error);
  }
};

const leaderboardService = { getLeaderboard };
export default leaderboardService;
