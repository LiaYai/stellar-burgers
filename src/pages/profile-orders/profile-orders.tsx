import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectUserOrders } from '../../services/orders';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useMemo(() => dispatch(getOrders()), []);
  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
