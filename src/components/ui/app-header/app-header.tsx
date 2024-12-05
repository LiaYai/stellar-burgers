import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  getIconColor,
  TIconProps
} from '@zlden/react-developer-burger-ui-components/dist/ui/icons/utils';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            clsx(styles.link, { [styles.link_active]: isActive })
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon
                type={isActive ? 'primary' : 'secondary'}
                className='icon'
              />
              <p className='text text_type_main-default ml-2 mr-10 icon'>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          to={'/feed'}
          className={({ isActive }) =>
            clsx(styles.link, { [styles.link_active]: isActive })
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon
                type={isActive ? 'primary' : 'secondary'}
                className='icon'
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <Link to={'/'} className={styles.logo}>
        <Logo className='' />
      </Link>
      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          clsx(styles.link, styles.link_position_last, {
            [styles.link_active]: isActive
          })
        }
      >
        {({ isActive }) => (
          <>
            <ProfileIcon
              type={isActive ? 'primary' : 'secondary'}
              className='icon'
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
