import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from 'src/utils/cookie';
import AppRoutes from '../../utils/constants';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(AppRoutes.LOGIN);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
