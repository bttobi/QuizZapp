const getQuiz = (req, res, next) => {
  return res.status(200).json({
    quizID: req.params.quizID,
    questions: [
      {
        question: 'Kura czy bajo jajo?',
        answers: ['jajo', 'kura', 'fire in the hole', 'idk bajo'],
        timeInMs: 5000,
      },
      {
        question: 'Jacek?',
        answers: ['marcin', 'jaca', 'jacek jojo', 'motor'],
        timeInMs: 3000,
      },
    ],
  });
};

const postAnswers = (req, res, next) => {
  const { user, answers } = req.body;
  console.log(answers, user.email);
  //TODO: get correct answers from db and add points accordingly
  // add quizID as "DONE" to user info
  // check only most recent attempt (for now), return error if the user has not submitted answers before
  return res.sendStatus(204);
};

const getResults = (req, res, next) => {
  const { userEmail, quizID } = req.params;

  return res.status(200).json({
    email: userEmail,
    score: 420,
    correctAnswers: ['jajo', 'marcin', 'little andrew'],
  });
};

const quizService = { getQuiz, postAnswers, getResults };
export default quizService;
