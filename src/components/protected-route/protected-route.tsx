import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AppRoutes from '../../utils/constants';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData, getUserIsLoading } from '../../services/user';
import App from '../app/app';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  //const isLoading = useSelector(getUserIsLoading);
  const user = useSelector(getUserData);
  const location = useLocation();

  // if (isLoading) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={AppRoutes.LOGIN} state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || AppRoutes.ROOT;
    return <Navigate replace to={from} />;
  }

  return children;
}
