export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/users',
    name: 'users',
    icon: 'user',
    component: './Users',
  },
  {
    path: '/orders',
    name: 'orders',
    icon: 'shoppingCart',
    component: './Orders',
  },
  {
    path: '/products',
    name: 'products',
    icon: 'database',
    component: './Orders',
  },
  {
    path: '/',
    component: './WelcomePage',
  },
  {
    path: '/account/center',
    component: './account/center',
  },
];