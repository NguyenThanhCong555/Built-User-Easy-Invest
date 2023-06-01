import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { selectAuth } from 'store/slice/auth/selectors';

function PrivateRouter() {
  const { isLogin } = useSelector(selectAuth);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    if (!isLogin) {
      if (location.pathname.split('/').includes('projects') && searchParams.get('mode') === 'preview') {
        // Do something here
        // If another browser is inactive
        sessionStorage.setItem('next', params?.projectId ?? '');
      }
    }
  }, [isLogin]);

  return isLogin ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRouter;
