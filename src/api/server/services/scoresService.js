import client from '../setup/dbSetup.js';
/***************************GET***************************/

const getPersonalOverallScores = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const { rows } = await client.query(
      `SELECT user_id, email, overall_prof, best_quiz, best_prof_quiz, best_question, best_question_prof, worst_quiz, worst_prof_quiz, worst_question, worst_question_prof, most_taken_quiz, most_taken_count, attempt_count, created_quizzes
      FROM public."scoresView" where user_id=$1;`,
      [userID]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
const getOverallScores = async (req, res, next) => {
  try {
    const { rows } = await client.query(
      `select 
      (select count(*) from users) as users_count,
      (select count(*) from quizzes) as quizzes_count,
      (select count(*) from questions) as questions_count,
      (select count(*) from leaderboard) as attempts_count,
      (select sum(count_good) from public."questionStats") as all_good_answers,
      (select sum(count_bad) from public."questionStats") as all_bad_answers
      ;`
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
const scoresService = {
  getPersonalOverallScores,
  getOverallScores,
};
export default scoresService;
