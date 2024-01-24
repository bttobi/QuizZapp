import client from '../setup/dbSetup.js';
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
      .sort(() => 0.5 - Math.random())
      .map(question => {
        question.answers.sort(() => 0.5 - Math.random());
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

const getQuizToEdit = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { rows } = await client.query(
      `select quiz_name, category, thumbnail_src from quizzes
      where quiz_id=$1`,
      [quizID]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
const getQuestionToEdit = async (req, res, next) => {
  try {
    const { questionID } = req.params;
    const { rows } = await client.query(
      `select question, answers, correct as correct_answer from questions
      where question_id=$1`,
      [questionID]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const getQuestionsForQuiz = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { rows } = await client.query(
      `select question_id, question from questions
      where quiz_id=$1`,
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
    const { user_id, correctAnswers, wrongAnswers } = req.body;
    await client.query(
      `INSERT INTO public.leaderboard(
        user_id, quiz_id, g_answers, b_answers, points)
       VALUES ( $1, $2, $3, $4, $5);`,
      [user_id, quizID, correctAnswers, wrongAnswers, correctAnswers.length]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createQuiz = async (req, res, next) => {
  try {
    const { quiz_name, category, user_id, thumbnail_src } = req.body;
    const thumbnail = thumbnail_src
      ? thumbnail_src
      : 'https://static.wikia.nocookie.net/4e01ffe5-86b8-4d8c-9c34-85868d05f6b7/scale-to-width/755';

    await client.query(
      `INSERT INTO public.quizzes(
        quiz_name, category, user_id, thumbnail_src)
       VALUES ( $1, $2, $3, $4);`,
      [quiz_name, category, user_id, thumbnail]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const { quizID } = req.params;
    const { question, answers, correct_answer } = req.body;
    console.log(quizID);
    await client.query(
      `INSERT INTO public.questions(
        quiz_id, question, answers, correct)
       VALUES ( $1, $2, $3, $4);`,
      [quizID, question, answers, correct_answer]
    );
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

/***************************MODIFY***************************/
const editQuiz = async (req, res, next) => {
  try {
    const { quiz_name, category, thumbnail_src } = req.body;
    const { quizID } = req.params;
    const thumbnail = thumbnail_src
      ? thumbnail_src
      : 'https://static.wikia.nocookie.net/4e01ffe5-86b8-4d8c-9c34-85868d05f6b7/scale-to-width/755';

    await client.query(
      `UPDATE public.quizzes
        SET quiz_name=$1, category=$2, thumbnail_src=$4
        WHERE quiz_id=$3;`,
      [quiz_name, category, quizID, thumbnail]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const { quizzesIDs, user_id } = req.body;

    await client.query(
      `DELETE FROM public.quizzes
      where quiz_id = any ($1)
      and user_id = $2;`,
      [quizzesIDs, user_id]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const editQuestion = async (req, res, next) => {
  try {
    const { questionID } = req.params;
    const { question, answers, correct_answer } = req.body;

    await client.query(
      `UPDATE public.questions
        SET question=$2, answers=$3, correct=$4
      WHERE question_id=$1;`,
      [questionID, question, answers, correct_answer]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { questionsIDs } = req.body;

    await client.query(
      `DELETE FROM public.questions
      where question_id = any ($1)`,
      [questionsIDs]
    );

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const quizService = {
  getQuiz,
  getCorrectAnswers,
  getQuizToEdit,
  getQuestionToEdit,
  getQuestionsForQuiz,
  postResults,
  createQuiz,
  editQuiz,
  deleteQuiz,
  createQuestion,
  editQuestion,
  deleteQuestion,
};
export default quizService;
