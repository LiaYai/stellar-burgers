import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import AppRoutes from '@constants';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '@store';
import { getUserData, getUserIsLoading, getUserAuth } from '@slices';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const isLoading = useSelector(getUserIsLoading);
  const user = useSelector(getUserData);
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={AppRoutes.LOGIN} state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: AppRoutes.ROOT } };
    return <Navigate replace to={from} />;
  }

  return children;
}
