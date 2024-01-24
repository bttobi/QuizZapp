import express from 'express';
import config from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'cookie-session';
import passport from 'passport';
import initializePassport from '../passports/passportLocalConfig.js';
import initializeJWT from '../passports/passportJWTConfig.js';

config.configDotenv();

const PORT = process.env.VITE_SERVER_PORT || '8080';

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'https://bttobi.github.io',
        'http://localhost:5173',
      ];
      if (origin && allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.VITE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    unset: 'destroy',
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
initializePassport(passport);
initializeJWT(passport);

app.listen(PORT, () =>
  console.log(`Server running on: ${process.env.VITE_SERVER_HOST}:${PORT}`)
);

export default app;
