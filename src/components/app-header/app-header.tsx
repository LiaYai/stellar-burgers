import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services/user';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);
  return <AppHeaderUI userName={user?.name} />;
};
