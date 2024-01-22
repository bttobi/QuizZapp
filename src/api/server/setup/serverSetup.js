import express from 'express';
import config from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import initializePassport from '../passports/passportLocalConfig.js';
import initializeJWT from '../passports/passportJWTConfig.js';

config.configDotenv();

const PORT = process.env.VITE_SERVER_PORT || '';

const app = express();
app.use(
  session({
    secret: process.env.VITE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
initializePassport(passport);
initializeJWT(passport);
app.use(cors());
app.listen(PORT, () =>
  console.log(`Server running on: ${process.env.VITE_SERVER_HOST}:${PORT}`)
);

export default app;
