import axios from 'axios';
import { createRefresh } from 'react-auth-kit';
import { refreshUserTokenRoute } from '../routes/user.routes';

const refreshToken = createRefresh({
  interval: 3,
  //@ts-expect-error this is needed because of react-auth-kit not parsing types correctly
  refreshApiCallback: async ({ refreshToken }) => {
    try {
      const res = await axios.post(
        refreshUserTokenRoute(),
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );
      return {
        isSuccess: true,
        newAuthToken: res.data.token,
        newRefreshToken: res.data.token,
        newAuthTokenExpireIn: 600,
        newRefreshTokenExpiresIn: 600,
      };
    } catch (error) {
      return { isSucces: false };
    }
  },
});

export default refreshToken;
