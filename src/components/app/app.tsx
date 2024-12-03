import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Layout } from '../layout';
import AppRoutes from '@constants';
import { useDispatch } from '@store';
import { useCallback, useEffect } from 'react';
import { getIngredients, getUserAuth, clearSelectedOrder } from '@slices';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileOrderId = useMatch(AppRoutes.ORDER_INFO)?.params.id;
  const feedId = useMatch(AppRoutes.FEED_INFO)?.params.id;
  const orderNumber = profileOrderId || feedId;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedOrder());
  }, [dispatch]);

  const closeModalOrder = () => {
    navigate(background.pathname);
    clearSelected();
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path={AppRoutes.ROOT} element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route path={AppRoutes.FEED} element={<Feed />} />
          <Route
            path={AppRoutes.LOGIN}
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.REGISTER}
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.FORGOT_PASSWORD}
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.RESET_PASSWORD}
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.ORDERS}
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.INGREDIENTS}
            element={
              <div className={styles.detailPageWrap}>
                <h3
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали ингредиента
                </h3>
                <IngredientDetails />
              </div>
            }
          />
          <Route
            path={AppRoutes.FEED_INFO}
            element={
              <div className={styles.detailPageWrap}>
                <h3
                  className={`text text_type_digits-default ${styles.detailHeader}`}
                >
                  {`#${orderNumber && orderNumber.padStart(6, '0')}`}
                </h3>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path={AppRoutes.ORDER_INFO}
            element={
              <ProtectedRoute>
                <div className={styles.detailPageWrap}>
                  <h3
                    className={`text text_type_digits-default ${styles.detailHeader}`}
                  >
                    {`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  </h3>
                  <OrderInfo />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFound404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={AppRoutes.INGREDIENTS}
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => navigate(background.pathname)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.FEED_INFO}
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={closeModalOrder}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.ORDER_INFO}
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  onClose={closeModalOrder}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
