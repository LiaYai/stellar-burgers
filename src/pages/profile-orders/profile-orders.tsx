import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getOrdersIsLoading,
  getUserOrders
} from '../../services/orders';
import { Preloader } from '../../components/ui/preloader';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getUserOrders);
  const isLoading = useSelector(getOrdersIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
