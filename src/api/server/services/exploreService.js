import client from "../setup/dbSetup.js";

const getQuizzes = async (req, res, next) => {
  try {
    const { userfilter, namefilter, categoryfilter } = req.headers;
    const { page } = req.params;

    const offset = (page - 1) * 12;

    const nfilter = `%${namefilter || ""}%`;
    const cfilter = `%${categoryfilter || ""}%`;
    const ufilter = `%${userfilter || ""}%`;

    const { rows } = await client.query(
      `select quiz_id as quizID, quiz_name as quizName, 
      (select email from users where user_id=a.user_id) as author, category, thumbnail_src as thumbnailSrc, 
      (select count(*) from questions where quiz_id=a.quiz_id) as questioncount
      from quizzes a
      where 
      upper(quiz_name) like upper($1)
      and
      upper(category) like upper($2)
      and (select email from users where user_id=a.user_id) like $4
      limit 12
      offset $3`,
      [nfilter, cfilter, offset, ufilter]
    );
    const { rows: quizzesCount } = await client.query(
      `select count(*) as quizzesCount from quizzes`
    );
    const formatedRows = rows
      .map((row) => {
        return {
          quizID: row.quizid,
          quizName: row.quizname,
          author: row.author,
          category: row.category,
          questionCount: row.questioncount,
          thumbnailSrc: row.thumbnailsrc,
        };
      })
      .filter((el) => (ufilter !== "" ? Number(el.questionCount) > 0 : true));
    return res.status(200).json({
      quizzes: formatedRows,
      quizzesCount: quizzesCount[0].quizzescount,
    });
  } catch (error) {
    next(error);
  }
};

const exploreService = { getQuizzes };
export default exploreService;
