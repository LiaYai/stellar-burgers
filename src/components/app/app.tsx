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
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Layout } from '../layout/layout';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/ingredients';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(getIngredients());

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute isAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute isAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute isAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute isAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute isAuth>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <ProtectedRoute isAuth>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders/:number'
              element={
                <ProtectedRoute isAuth>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'OrderInfo'}
                onClose={() => {
                  navigate('/feed', { replace: true });
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'IngredientDetails'}
                onClose={() => navigate('/ingredients')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={'MyOrderInfo'}
                onClose={() => navigate('/profile/orders')}
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
