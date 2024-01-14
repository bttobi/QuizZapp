import passport from "passport";
import jwtToken from "../helpers/jwtHelper.js";
import client from "../setup/dbSetup.js";
import bcrypt from "bcrypt";

const signIn = (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) return res.status(500).json({ error });

    const token = jwtToken({ userID: user.user_id, userEmail: user.email });
    res.cookie("jwt_token", token, { httpOnly: true });
    return res
      .status(200)
      .json({ email: user.email, userID: user.user_id, token });
  })(req, res, next);
};

const getPoints = async (req, res, next) => {
  try {
    const { userEmail: email } = req.params;
    const { rows } = await client.query(
      `select points, place from public."leaderboardView"
      where email=$1`,
      [email]
    );

    const points = rows[0].points;
    const place = rows[0].place;

    return res.status(200).json({ points, place });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows } = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (rows.length > 0) {
      return res.status(500).json({ error: "EMAIL_ALR_IN_USE" });
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
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("jwt_token");
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "GENERAL_ERROR" });
  }
};

const getToken = (req, res, next) => {
  const user = req.user;
  if (!user) console.log("NO USER");

  const token = jwtToken({ userID: user.id, userEmail: user.email });
  res.cookie("jwt_token", token);
  return res.status(200).json({ token });
};

const userService = { signUp, signIn, signOut, getPoints, getToken };
export default userService;
