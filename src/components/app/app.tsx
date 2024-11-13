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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<ProtectedRoute accessRoles={[]} />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path='/register' element={<ProtectedRoute accessRoles={[]} />}>
        <Route path='/register' element={<Register />} />
      </Route>
      <Route
        path='/forgot-password'
        element={<ProtectedRoute accessRoles={[]} />}
      >
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route
        path='/reset-password'
        element={<ProtectedRoute accessRoles={[]} />}
      >
        <Route path='/reset-password' element={<ResetPassword />} />
      </Route>
      <Route path='/profile' element={<ProtectedRoute accessRoles={[]} />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route
        path='/profile/orders'
        element={<ProtectedRoute accessRoles={[]} />}
      >
        <Route path='/profile/orders' element={<ProfileOrders />} />
      </Route>
      <Route path='*' element={<NotFound404 />} />
      {/* <Route
        path='/feed/:number'
        element={
          <Modal
            title={''}
            onClose={() => {
              console.log('close modal');
            }}
          />
        }
      >
        <OrderInfo />
      </Route> */}
      {/* <Route
        path='/ingredients/:id'
        element={
          <Modal
            title={''}
            onClose={() => {
              console.log('close modal');
            }}
          />
        }
      >
        <IngredientDetails />
      </Route> */}
      <Route
        path='/profile/orders/:number'
        element={<ProtectedRoute accessRoles={[]} />}
      >
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Route>
    </Routes>
  </div>
);

export default App;
