import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { logoutUser } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logout: () => void = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={logout} pathname={pathname} />;
};
