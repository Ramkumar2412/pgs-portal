import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import RouteConstants from '../constants/RouteConstants';
import AuthService from '../services/authService';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const isAuthenticated = AuthService._getAccessToken();
  console.log('isAuthenticated', isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={`/dashboard/mobileVerification`} />;
  }

  return <>{children}</>;
}
