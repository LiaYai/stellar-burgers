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

import { IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Layout } from '../layout/layout';
import AppRoutes from '../../utils/constants';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { getIngredients } from '../../services/ingredients';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useMemo(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path={AppRoutes.ROOT} element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route path={AppRoutes.FEED} element={<Feed />} />
          <Route
            path={AppRoutes.LOGIN}
            element={
              <ProtectedRoute isAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.REGISTER}
            element={
              <ProtectedRoute isAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.FORGOT_PASSWORD}
            element={
              <ProtectedRoute isAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.RESET_PASSWORD}
            element={
              <ProtectedRoute isAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.PROFILE}
            element={
              <ProtectedRoute isAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.ORDERS}
            element={
              <ProtectedRoute isAuth>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFound404 />} />
        </Route>
        <Route
          path={AppRoutes.ORDER_INFO}
          element={
            <ProtectedRoute>
              <Modal
                title={'идентификатор заказа'}
                onClose={() =>
                  navigate({
                    pathname: AppRoutes.ORDERS
                  })
                }
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={AppRoutes.INGREDIENTS}
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => navigate({ pathname: AppRoutes.ROOT })}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={AppRoutes.FEED_INFO}
            element={
              <Modal
                title={'идентификатор заказа'}
                onClose={() => {
                  navigate({ pathname: AppRoutes.FEED });
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
