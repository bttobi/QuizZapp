import jwt from 'jsonwebtoken';

const jwtTokens = ({ userID, userEmail }) => {
  const user = { userID, userEmail };
  const token = jwt.sign(user, process.env.VITE_JWT_SECRET, {
    expiresIn: `${process.env.VITE_ACCESS_TOKEN_VALID_TIME}h`,
  });
  return token;
};

export default jwtTokens;
