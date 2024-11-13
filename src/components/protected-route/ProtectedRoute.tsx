import { TUser } from '@utils-types';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ accessRoles }: { accessRoles: TUser[] }) => (
  // const { user, isInit, isLoading } = useSelector((store: RootState) => store.user);

  // if (!isInit || isLoading) {
  //     return <div>Загрузка...</div>
  // }

  // if (!user || !accessRoles.includes(user.role)) {
  //     return <Navigate to="/sign-in" />;
  // }

  <Outlet />
);
