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
        question: 'Jacek dudek?',
        answers: ['marcin', 'jaca', 'jacek dudek jojo', 'motor'],
        timeInMs: 3000,
      },
      {
        question: 'Nataszka?',
        answers: ['nieletnia', 'zmienila imie', 'little andrew', 'motorowka'],
        timeInMs: 10000,
      },
    ],
  });
};

const getResults = (req, res, next) => {
  const { user, answers } = req.body;
  console.log(answers, user.email);
  //TODO: get correct answers from db and add points accordingly
  // add quizID as "DONE" to user info
  // check only most recent attempt (for now), return error if the user has not submitted answers before
  return res.status(200).json({
    email: user.email,
    score: 420,
    correctAnswers: ['jajo', 'marcin', 'little andrew'],
  });
};

const quizService = { getQuiz, getResults };
export default quizService;
