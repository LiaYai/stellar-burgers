import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import AppRoutes from '../../utils/constants';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout: () => void = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={logout} pathname={pathname} />;
};
