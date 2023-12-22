import { useAuthHeader } from 'react-auth-kit';

const getAuthToken = () => {
  const auth = useAuthHeader();

  return auth().split(' ')[1];
};

export default getAuthToken;
