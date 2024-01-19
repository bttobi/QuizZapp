import client from "../setup/dbSetup.js";
/***************************GET***************************/

const getPersonalOverallScores = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const { rows } = await client.query(
      `
      select
      (SELECT sum(good_answers)/(sum(good_answers)+sum(bad_answers))*100 FROM public."quizStats" where user_id=$1) as overall_prof,
      (select quiz_name from quizzes where quiz_id=(select quiz_id as best_quiz from (SELECT quiz_id, sum(good_answers)/(sum(good_answers)+sum(bad_answers))*100 as quiz_prof FROM public."quizStats" where user_id=$1 group by 1 order by 2 desc)
      limit 1)) as best_quiz, 
      (select quiz_prof as best_prof_quiz from (SELECT quiz_id, sum(good_answers)/(sum(good_answers)+sum(bad_answers))*100 as quiz_prof FROM public."quizStats" where user_id=$1 group by 1 order by 2 desc)
      limit 1) as best_prof_quiz,
      (select question from questions where question_id=(select question_id from (SELECT question_id, count_good*100/(count_good+count_bad) as question_prof FROM public."questionStats"where user_id=$1 order by 2 desc) 
      limit 1)) as best_question, 
      (select question_prof from (SELECT question_id, count_good*100/(count_good+count_bad) as question_prof FROM public."questionStats"where user_id=$1 order by 2 desc) 
      limit 1) as best_question_prof,
      (select quiz_name from quizzes where quiz_id=(select quiz_id as worst_quiz from (SELECT quiz_id, sum(good_answers)/(sum(good_answers)+sum(bad_answers))*100 as quiz_prof FROM public."quizStats" where user_id=$1 group by 1 order by 2)
      limit 1)) as worst_quiz, 
      (select quiz_prof as worst_prof_quiz from (SELECT quiz_id, sum(good_answers)/(sum(good_answers)+sum(bad_answers))*100 as quiz_prof FROM public."quizStats" where user_id=$1 group by 1 order by 2)
      limit 1) as worst_prof_quiz,
      (select question from questions where question_id=(select question_id from (SELECT question_id, count_good*100/(count_good+count_bad) as question_prof FROM public."questionStats"where user_id=$1 order by 2 ) 
      limit 1)) as worst_question,  
      (select question_prof from (SELECT question_id, count_good*100/(count_good+count_bad) as question_prof FROM public."questionStats"where user_id=$1 order by 2 ) 
      limit 1) as worst_question_prof, 
      (select quiz_name from quizzes where quiz_id=(select quiz_id from (SELECT quiz_id, count(*) as quiz_attempt FROM public."quizStats" where user_id=$1 group by 1 order by 2 desc) 
      limit 1)) as most_taken_quiz, 
      (select quiz_attempt from (SELECT quiz_id, count(*) as quiz_attempt FROM public."quizStats" where user_id=$1 group by 1 order by 2 desc) 
      limit 1) as most_taken_count, 
      (SELECT count(*) as attempt_count FROM public."quizStats" where user_id=$1) as attempt_count,
      (select count(*) as created_quizzes from public.quizzes where user_id=1 ) as created_quizzes,
      (select email from users where user_id=$1) as email
      ;`,
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
