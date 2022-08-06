import * as React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../Layout/Admin';

export interface PrivateRouteProps {
   children?: React.ReactNode
   redirectTo: string
}

export function PrivateRoute({ children, redirectTo }: PrivateRouteProps) {
   const isLoggedIn = Boolean(localStorage.getItem('access_token'));
   console.log('Is logged in', isLoggedIn);
   if (!isLoggedIn) return <Navigate to={redirectTo} />;
   return (
      <div>
         {children}
      </div>
   );
}

