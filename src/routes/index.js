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


      ],
    },
    {
      element: (
        <GuestGuard>
          <Suspense>
          <DashboardLayout />
          </Suspense>
        </GuestGuard>
        
      ),
      path: "dashboard",
      children: [
        
        { path: "modbus", element: <ModbusConfiguration /> },
        { path: "gateway", element: <GatewayConfiguration /> },
        {path: "modbus_config", element:<EditModbusConfiguration/>},
        
        {path : "gateway_config",element:<EditGatewayConfiguration />},
        {path : "sensor",element:<SensorConfiguration />},
        {path:"sensor_config",element:<EditSensorConfiguration />},
        {path : "sensor_data",element:<SensorData /> , Component : SensorData},
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
const EditGatewayConfiguration = lazy(() => import("../pages/EditGatewayConfiguration"));
const GatewayConfiguration = lazy(() => import("../pages/GatewayConfiguration"));
const SensorConfiguration = lazy(() => import("../pages/SensorConfiguration"));
const EditSensorConfiguration = lazy(() => import("../pages/EditSensorConfiguration"));
const SensorData = lazy(() => import("../pages/sensorData"));