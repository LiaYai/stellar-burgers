enum AppRoutes {
  ROOT = '/',
  FEED = '/feed',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  PROFILE = '/profile',
  ORDERS = '/profile/orders',
  NOT_FOUND = '*',
  ORDER_INFO = '/profile/orders/:id',
  INGREDIENTS = '/ingredients/:id',
  FEED_INFO = '/feed/:id'
}

export default AppRoutes;
