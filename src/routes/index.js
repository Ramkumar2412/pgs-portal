import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard"

import RouteConstants from "../constants/RouteConstants";
import AuthGuard from "../guards/AuthGuard";



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
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        path: "dashboard"
        // children: [
        //   { path: "page1", element: <PageSix /> },
        //   {path: "userDetails", element:<UserDetails/>},
        //   { path: "mapPage", element: <MapPage /> },
        //   { path: "bookings", element: <PageSeven /> },
        //   { path: "Views", element: <PageEight /> },
        //   { path: "user/profile", element: <PageFive /> },
        // ],
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
            path: RouteConstants.REGISTER,
            element: (
              <GuestGuard>
                <Register />
              </GuestGuard>
            ),
          },
          { path: "login-unprotected", element: <Login /> },
          // { path: "register-unprotected", element: <Register /> },
          // { path: "reset-password", element: <ResetPassword /> },
          // { path: "new-password", element: <NewPassword /> },
          // { path: "mobileVerification", element: <MobileVerification /> },
          // { path: "verify", element: <VerifyCode /> },
        ],
      },
      {
        path: "*",
        element: <LogoOnlyLayout />,
        children: [
          //{ path: "404", element: <NotFound /> },
          { path: "*", element: <Navigate to="/dashboard/page1" replace /> },
        ],
      },
      { path: "*", element: <Navigate to="/dashboard/page1" replace /> },
    ]);
  }