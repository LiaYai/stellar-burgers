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
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Layout } from '../layout/layout';
import AppRoutes from '../../utils/constants';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { getIngredients } from '../../services/ingredients';
import { clearSelectedOrder } from '../../services/feeds';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useMemo(() => {
    dispatch(getIngredients());
  }, []);

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedOrder());
  }, []);

  const closeModalOrder = () => {
    navigate(background?.pathname || AppRoutes.ROOT);
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
          <Route
            path={AppRoutes.ORDER_INFO}
            element={
              <ProtectedRoute>
                <Modal
                  title={'byjk'}
                  onClose={() => navigate(AppRoutes.PROFILE)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={AppRoutes.INGREDIENTS}
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => navigate(background)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={'/feed/:id'}
            element={
              <Modal
                title={`#${location.pathname.split('/')[2]}`}
                onClose={closeModalOrder}
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
