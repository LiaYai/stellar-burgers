import { TUser } from '@utils-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuth?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ children, isAuth }: ProtectedRouteProps) {
  // const { user, isInit, isLoading } = useSelector((store: RootState) => store.user);

  // if (!isInit || isLoading) {
  //     return <div>Загрузка...</div>
  // }
  // if (!user || !accessRoles.includes(user.role)) {
  //     return <Navigate to="/login" />;
  // }
  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return children;
}
