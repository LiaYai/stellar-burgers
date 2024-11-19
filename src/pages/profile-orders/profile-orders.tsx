import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrders,
  getOrdersIsLoading,
  getUserOrders
} from '../../services/orders';
import { AppDispatch } from '../../services/store';
import { Preloader } from '../../components/ui/preloader';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useMemo(() => dispatch(getOrders()), []);
  const orders: TOrder[] = useSelector(getUserOrders);
  const isLoading = useSelector(getOrdersIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
