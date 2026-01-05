// apps/cv-builder/src/hocs/withAuth.tsx
import { FC, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader/Loader';
import AppLayout from '../layout/AppLayout';

interface WithAuthProps {
  children: React.ReactNode;
}

export const WithAuth: FC<WithAuthProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
};

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const ComponentWithAuth: FC<P> = (props) => (
    <WithAuth>
      <WrappedComponent {...props} />
    </WithAuth>
  );

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
  return ComponentWithAuth;
};
