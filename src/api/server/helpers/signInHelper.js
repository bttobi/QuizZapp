import passport from 'passport';
import jwtToken from './jwtHelper.js';

const signIn = (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) return res.status(500).json({ error });

    const token = jwtToken({ userID: user.id, userEmail: user.email });
    res.cookie('jwt_token', token, { httpOnly: true });
    return res.status(200).json({ email: user.email, token });
  })(req, res, next);
};

export default signIn;
