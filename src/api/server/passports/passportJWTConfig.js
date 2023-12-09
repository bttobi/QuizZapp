import passport from 'passport-jwt';
import client from '../setup/dbSetup.js';

const JWTStrategy = passport.Strategy;
const ExtractJWT = passport.ExtractJwt;
const initializeJWT = passportJWT => {
  passportJWT.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.VITE_JWT_SECRET,
      },
      function (jwtPayload, done) {
        client.query(
          `SELECT * FROM users WHERE email = $1`,
          [jwtPayload.userEmail],
          (error, dbRes) => {
            if (error) return done('GENERAL_ERROR');
            if (dbRes.rows.length > 0) {
              const user = dbRes.rows[0];
              return done(null, user);
            } else {
              return done('USER_DOES_NOT_EXIST', false);
            }
          }
        );
      }
    )
  );
};

export default initializeJWT;
