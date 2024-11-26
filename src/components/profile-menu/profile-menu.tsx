import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { deleteCookie } from '@utils-cookie';
import { logoutApi } from '@api';
import { setUser } from '@slices';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logout: () => void = useCallback(() => {
    logoutApi()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(setUser(null));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={logout} pathname={pathname} />;
};
