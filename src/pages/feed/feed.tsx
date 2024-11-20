import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getAllOrders } from '../../services/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const fetchFeeds = useCallback(() => dispatch(getFeeds()), [dispatch]);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const orders: TOrder[] = useSelector(getAllOrders);

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
