import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// components
import LoadingScreen from "../components/LoadingScreen";

import RouteConstants from "../constants/RouteConstants";
// import AuthGuard from 'src/guards/AuthGuard';
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "src/guards/AuthGuard";


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Navigate
          to={`${RouteConstants.ROOT_AUTH}/${RouteConstants.LOGIN}`}
          replace
        />
      ),
    },


    {
      path: RouteConstants.ROOT_AUTH,
      children: [
        {
          path: RouteConstants.LOGIN,
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },

        { 
          path: "modbus", 
          element: (
          <GuestGuard>
            <ModbusConfiguration />
          </GuestGuard>
        ) },

        
        { 
          path: "modbus_config", 
          element: (
          <GuestGuard>
            <EditModbusConfiguration />
          </GuestGuard>
        ) },


      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },

      ],
    },
   
  ]);
}

// Dashboard

const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const Login = Loadable(lazy(() => import("../pages/auth/Login")));

const ModbusConfiguration = lazy(() => import("../pages/ModbusConfiguration"));
const EditModbusConfiguration = lazy(() => import("../pages/EditModbusConfiguration"));
