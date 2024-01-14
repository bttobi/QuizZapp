import client from "../setup/dbSetup.js";
/***************************GET***************************/
const getQuiz = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { rows } = await client.query(
      `select  question_id, question, answers from questions
      where quiz_id=$1`,
      [quizID]
    );

    const shuffledQuestions = rows
      .sort((a, b) => 0.5 - Math.random())
      .map((question) => {
        question.answers.sort((a, b) => 0.5 - Math.random());
        return question;
      });

    return res.status(200).json(shuffledQuestions);
  } catch (error) {
    next(error);
  }
};

const getCorrectAnswers = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { rows } = await client.query(
      `select question_id, correct as answer from questions where quiz_id=$1`,
      [quizID]
    );

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
/***************************INSERT/CREATE***************************/
const postResults = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { userID, correctAnswers, wrongAnswers } = req.body;
    const { rows } = await client.query(
      `INSERT INTO public.leaderboard(
        user_id, quiz_id, g_answers, b_answers, points)
       VALUES ( $1, $2, $3, $4, $5);`,
      [userID, quizID, correctAnswers, wrongAnswers, correctAnswers.length]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const createQuiz = async (req, res, next) => {
  try {
    const { quizName, category, userID, thumbnailSrc } = req.body;
    let thumbnail;
    if (thumbnailSrc) {
      thumbnail = thumbnailSrc;
    } else {
      thumbnail = "https://i.imgur.com/CZaDkUQ.png";
    }
    const { rows } = await client.query(
      `INSERT INTO public.quizzes(
        quiz_name, category, user_id, thumbnail_src)
       VALUES ( $1, $2, $3, $4);`,
      [quizName, category, userID, thumbnail]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const { quizID, question, answers, correctAnswer } = req.body;

    const { rows } = await client.query(
      `INSERT INTO public.questions(
        quiz_id, question, answers, correct)
       VALUES ( $1, $2, $3, $4);`,
      [quizID, question, answers, correctAnswer]
    );
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

/***************************MODIFY***************************/
const editQuiz = async (req, res, next) => {
  try {
    const { quizName, category, quizID, thumbnailSrc } = req.body;
    const thumbnail = thumbnailSrc
      ? thumbnailSrc
      : "https://i.imgur.com/CZaDkUQ.png";

    const { rows } = await client.query(
      `UPDATE public.quizzes
        SET quiz_name=$1, category=$2, thumbnail_src=$4
        WHERE quiz_id=$3;`,
      [quizName, category, quizID, thumbnail]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const { quizID, userID } = req.body;

    const { rows } = await client.query(
      `DELETE FROM public.quizzes
       WHERE quiz_id=$1 and user_id=$2;`,
      [quizID, userID]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const editQuestion = async (req, res, next) => {
  try {
    const { quizID, question, answers, correctAnswer } = req.body;

    const { rows } = await client.query(
      `UPDATE public.questions
        SET question=$2, answers=$2, correct$3
      WHERE question_id=$1;;`,
      [quizID, question, answers, correctAnswer]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { questionID } = req.body;

    const { rows } = await client.query(
      `DELETE FROM public.questions
       WHERE question_id=$1;`,
      [questionID]
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const quizService = {
  getQuiz,
  getCorrectAnswers,
  postResults,
  createQuiz,
  editQuiz,
  deleteQuiz,
  createQuestion,
  editQuestion,
  deleteQuestion,
};
export default quizService;
