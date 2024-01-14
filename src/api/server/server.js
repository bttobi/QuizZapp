import app from "./setup/serverSetup.js";
import client from "./setup/dbSetup.js";
import jwtToken from "./helpers/jwtHelper.js";
import bcrypt from "bcrypt";
import passport from "passport";
import userService from "./services/userService.js";
import exploreService from "./services/exploreService.js";
import quizService from "./services/quizService.js";
import leaderboardService from "./services/leaderboardService.js";

/*
 ******************************************************
 ***********************USER***************************
 ******************************************************
 */
app.post("/user/signup", async (req, res, next) => {
  userService.signUp(req, res, next);
});

app.post("/user/signin", (req, res, next) => {
  userService.signIn(req, res, next);
});

app.post("/user/signout", (req, res, next) => {
  userService.signOut(req, res, next);
});

app.post(
  "/user/token",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    userService.getToken(req, res, next);
  }
);

app.get("/user/points/:userEmail", (req, res, next) => {
  userService.getPoints(req, res, next);
});

/*
 ******************************************************
 ***********************EXPLORE************************
 ******************************************************
 */
app.get(
  "/explore/:page",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    exploreService.getQuizzes(req, res, next);
  }
);

/*
 ******************************************************
 *************************QUIZ*************************
 ******************************************************
 */
app.post("/quiz/create", (req, res, next) => {
  quizService.createQuiz(req, res, next);
});
app.get("/quiz/edit/:quizID", (req, res, next) => {
  quizService.getQuizToEdit(req, res, next);
});
app.post("/quiz/edit/:quizID", (req, res, next) => {
  quizService.editQuiz(req, res, next);
});
app.post("/quiz/delete", (req, res, next) => {
  quizService.deleteQuiz(req, res, next);
});

app.post("/quiz/:quizID/question/create", (req, res, next) => {
  quizService.createQuestion(req, res, next);
});
app.post("/quiz/:quizID/question/edit/:questionID", (req, res, next) => {
  quizService.editQuestion(req, res, next);
});
app.post("/quiz/:quizID/question/delete", (req, res, next) => {
  quizService.deleteQuestion(req, res, next);
});

app.get(
  "/quiz/:quizID",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    quizService.getQuiz(req, res, next);
  }
);

app.get(
  "/results/:quizID",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    quizService.getCorrectAnswers(req, res, next);
  }
);
app.post(
  "/results/:quizID",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    quizService.postResults(req, res, next);
  }
);
/*
/*
 ******************************************************
 *********************LEADERBOARD**********************
 ******************************************************
 */

app.get("/leaderboard/:page", (req, res, next) => {
  leaderboardService.getLeaderboard(req, res, next);
});
