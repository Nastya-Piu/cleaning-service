import CompanyList from './components/cleaning-companies/CompanyList';
import Register from './components/users/Register';
import Login from './components/users/Login';
import CompanyOrder from './components/cleaning-companies/CompanyOrder';
import UserPage from './components/users/UserPage';
import CompanyPage from './components/cleaning-companies/CompanyPage';
import CompanyOrderSuccess from './components/cleaning-companies/CompanyOrderSuccess';
import EditProfile from './components/users/EditProfile';
import CompanyCreate from './components/cleaning-companies/CompanyCreate';
import CompanyEdit from './components/cleaning-companies/CompanyEdit';

export const routes = [
  {
    path: '/',
    component: CompanyList
  },
  {
    path: '/services/new',
    component: CompanyCreate
  },
  {
    path: '/services/:id',
    component: CompanyPage
  },
  {
    path: '/services/:id/edit',
    component: CompanyEdit
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
    path: '/users/:id/edit',
    component: EditProfile
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