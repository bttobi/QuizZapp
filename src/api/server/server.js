import app from './setup/serverSetup.js';
import client from './setup/dbSetup.js';
import jwtToken from './helpers/jwtHelper.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import signIn from './helpers/signInHelper.js';

app.post('/user/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows } = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (rows.length > 0) {
      return res.status(500).json({ error: 'EMAIL_ALR_IN_USE' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
      email,
      hashedPassword,
    ]);

    signIn(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.post('/user/signin', (req, res, next) => {
  signIn(req, res, next);
});

app.post('/user/signout', (req, res) => {
  try {
    res.clearCookie('jwt_token');
    return res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'GENERAL_ERROR' });
  }
});

app.get(
  '/user/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    return res.status(200).json(req.userEmail);
  }
);

app.post(
  '/user/token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    if (!user) console.log('NO USER');

    const token = jwtToken({ userID: user.id, userEmail: user.email });
    res.cookie('jwt_token', token);
    return res.status(200).json({ token });
  }
);

app.get(
  '/explore/:page',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json([
      {
        quizID: 1,
        name: 'Fire in the hole',
        author: 'Lobotomy God',
        category: 'ANIME',
        thumbnailSrc:
          'https://cdn.pixabay.com/photo/2020/11/08/11/22/man-5723449_640.jpg',
      },
      {
        quizID: 2,
        name: 'Fire in the hole',
        author: 'Lobotomy God',
        category: 'HISTORY',
        thumbnailSrc:
          'https://cdn.pixabay.com/photo/2020/11/08/11/22/man-5723449_640.jpg',
      },
      {
        quizID: 3,
        name: 'Fire in the hole',
        author: 'Lobotomy God',
        category: 'GAMING',
      },
    ]);
  }
);
