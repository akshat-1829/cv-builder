// apps/cv-builder/src/components/Router/Router.tsx
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import { WithAuth } from '../../hocs/withAuth';
import AppLayout from '../../layout/AppLayout';
import ExploreCVsPage from '../../pages/ExploreCVs';
import AboutUs from '../../pages/AboutUs';
import CVEditor from '../../pages/CvEditor';
import AuthError from '../Auth/AuthError';
import AuthCallback from '../Auth/AuthCallback';

const protectedRoutes = [
  {
    route: '/',
    component: <Dashboard />,
    isProtected: false,
  },
  {
    route: '/login',
    component: <Login />,
    isProtected: false,
  },
  {
    route: '/register',
    component: <Login />,
    isProtected: false,
  },
  {
    route: '/explore-cvs',
    component: <ExploreCVsPage />,
    isProtected: false,
  },
  {
    route: '/about-us',
    component: <AboutUs />,
    isProtected: false,
  },
  {
    route: '/editor',
    component: <CVEditor />,
    isProtected: false,
  },
  {
    route: '/auth/error',
    component: <AuthError />,
  },
  {
    route: '/auth/callback',
    component: <AuthCallback />,
  },
];

const AppRouter: FC = () => {
  // const location = useLocation();

  return (
    <Routes>
      {protectedRoutes.map(({ route, component, isProtected }, index) => (
        <Route
          key={index}
          path={route}
          element={
            isProtected ? (
              <WithAuth>{component}</WithAuth>
            ) : route === '/login' || route === '/register' ? (
              component
            ) : (
              <AppLayout>{component}</AppLayout>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
