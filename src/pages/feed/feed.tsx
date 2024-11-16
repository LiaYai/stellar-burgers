import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getFeeds, selectAllOrders } from '../../services/feeds';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchFeeds = useCallback(() => dispatch(getFeeds()), [dispatch]);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const orders: TOrder[] = useSelector(selectAllOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        fetchFeeds();
      }}
    />
  );
};
