import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from 'src/utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { replace: true });
    localStorage.clear();
    localStorage.removeItem('token');
    // deleteCookie('token');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
