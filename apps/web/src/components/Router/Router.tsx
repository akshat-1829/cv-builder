// apps/cv-builder/src/components/Router/Router.tsx
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import { WithAuth } from '../../hocs/withAuth';
import AppLayout from '../../layout/AppLayout';
import ExploreCVsPage from '../../pages/ExploreCVs';
import AboutUs from '../../pages/AboutUs';

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
    route: '/explore-cvs',
    component: <ExploreCVsPage />,
    isProtected: false,
  },
  {
    route:'/about-us',
    component: <AboutUs />,
    isProtected: false,
  }
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
            ) : route === '/login' || route === '/signup' ? (
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
