import { TUser } from '@utils-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AppRoutes from '../../utils/constants';
import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectUser } from '../../services/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(selectUser);

  const isInit = false;
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={AppRoutes.LOGIN} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={AppRoutes.PROFILE} />;
  }

  return children;
}
