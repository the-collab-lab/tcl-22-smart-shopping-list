import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useRedirect = (userToken) => {
  const history = useHistory();

  useEffect(() => {
    !userToken && history.push('/');
  }, [userToken, history]);
};

export default useRedirect;
