import { useAuthUser } from 'react-auth-kit';

const useUser = () => {
  const auth = useAuthUser();
  const user = auth();

  const isSignedIn = user?.email ? true : false;
  return { user, isSignedIn };
};

export default useUser;
