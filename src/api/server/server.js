import app from './setup/serverSetup.js';
import client from './setup/dbSetup.js';
import jwtToken from './helpers/jwtHelper.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import userService from './services/userService.js';
import exploreService from './services/exploreService.js';
import quizService from './services/quizService.js';

/*
 ******************************************************
 ***********************USER***************************
 ******************************************************
 */
app.post('/user/signup', async (req, res, next) => {
  userService.signUp(req, res, next);
});

app.post('/user/signin', (req, res, next) => {
  userService.signIn(req, res, next);
});

app.post('/user/signout', (req, res, next) => {
  userService.signOut(req, res, next);
});

app.get(
  '/user/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    userService.getProfile(req, res, next);
  }
);

app.post(
  '/user/token',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    userService.getToken(req, res, next);
  }
);

/*
 ******************************************************
 ***********************EXPLORE************************
 ******************************************************
 */
app.get(
  '/explore/:page',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    exploreService.getExplorePage(req, res, next);
  }
);

/*
 ******************************************************
 *************************QUIZ*************************
 ******************************************************
 */
app.get(
  '/quiz/:quizID',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    quizService.getQuiz(req, res, next);
  }
);

app.post(
  '/results/:quizID',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    quizService.getResults(req, res, next);
  }
);
