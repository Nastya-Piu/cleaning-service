import CompanyList from './components/cleaning-companies/CompanyList';
import Register from './components/users/Register';
import Login from './components/users/Login';
import CompanyOrder from './components/cleaning-companies/CompanyOrder';
import { UserPage } from './components/users/UserPage';
import CompanyPage from './components/cleaning-companies/CompanyPage';
import CompanyOrderSuccess from './components/cleaning-companies/CompanyOrderSuccess';

export const routes = [
  {
    path: '/',
    component: CompanyList
  },
  {
    path: '/services/:id',
    component: CompanyPage
  },
  {
    path: '/users/register',
    component: Register
  },
  {
    path: '/users/login',
    component: Login
  },
  {
    path: '/users/:id',
    component: UserPage
  },
  {
    path: '/order/success',
    component: CompanyOrderSuccess
  },
  {
    path: '/order/:id',
    component: CompanyOrder
  }
];