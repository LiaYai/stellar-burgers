import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUserData } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);
  return <AppHeaderUI userName={user?.name} />;
};
