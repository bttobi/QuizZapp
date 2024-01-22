import client from '../setup/dbSetup.js';

const getQuizzes = async (req, res, next) => {
  try {
    const { userfilter, namefilter, categoryfilter, userid } = req.headers;
    const { page } = req.params;

    const offset = (page - 1) * 12;

    const nfilter = `%${namefilter || ''}%`;
    const cfilter = `%${categoryfilter || ''}%`;
    const ufilter = `%${userfilter || ''}%`;

    const { rows } = await client.query(
      `select quiz_id, quiz_name, 
      (select email from users where user_id=a.user_id) as author, category, thumbnail_src, 
      (select count(*) from questions where quiz_id=a.quiz_id) as question_count
      from quizzes a
      where 
      upper(quiz_name) like upper($1)
      and
      upper(category) like upper($2)
      and (select email from users where user_id=a.user_id) like $4
      ${
        !userfilter
          ? 'and (select count(*) from questions where quiz_id=a.quiz_id)>0'
          : ''
      }
      limit 12
      offset $3`,
      [nfilter, cfilter, offset, ufilter]
    );

    const quizzesCountResult = await getQuizzesCount(userid);

    async function getQuizzesCount(userid) {
      if (userid)
        return await await client.query(
          `select count(*) as quizzes_count
          from quizzes a
          where user_id=$1`,
          [userid]
        );

      return await client.query(
        `select count(*) as quizzes_count
        from quizzes a
        where (select count(*) from questions where quiz_id=a.quiz_id) > 0`
      );
    }

    return res.status(200).json({
      quizzes: rows,
      quizzes_count: quizzesCountResult.rows[0].quizzes_count,
    });
  } catch (error) {
    next(error);
  }
};

const exploreService = { getQuizzes };
export default exploreService;
