import { Outlet } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';

export const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
