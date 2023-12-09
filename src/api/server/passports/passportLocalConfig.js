import passport from 'passport-local';
import client from '../setup/dbSetup.js';
import bcrypt from 'bcrypt';

const LocalStrategy = passport.Strategy;

export const comparePasswords = (user, password1, password2, done) => {
  bcrypt.compare(password1, password2, (error, isMatched) => {
    if (error) return done('GENERAL_ERROR');
    if (isMatched) return done(null, user);
    else return done('INCORRECT_PASSWORD', false);
  });
};

const initializePassport = passport => {
  const authenticateUser = (email, password, done) => {
    client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (error, dbRes) => {
        if (error) throw error;

        if (dbRes.rows.length > 0) {
          const user = dbRes.rows[0];
          comparePasswords(user, password, user.password, done);
        } else {
          return done('USER_DOES_NOT_EXIST', false);
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    client.query(`SELECT * FROM users WHERE id = $1`, [id], (error, dbRes) => {
      if (error) throw error;
      return done(null, dbRes.rows[0]);
    });
  });
};

export default initializePassport;
