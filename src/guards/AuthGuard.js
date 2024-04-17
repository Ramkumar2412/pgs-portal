import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
// pages
// components
import AuthService from 'src/services/authService';
import RouteConstants from '../constants/RouteConstants';
import { useState } from 'react';
import Navigation from 'src/services/NavigationService';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const isAuthenticated = AuthService._getAccessToken();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  console.log("requestedLocation", requestedLocation);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return Navigation.navigateToLogin();
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
