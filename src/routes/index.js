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
import { element } from "prop-types";
import MapPage from "src/pages/MapPage";

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
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      path: "dashboard",
      children: [
        { path: "page1", element: <PageSix /> },
        {path: "userDetails", element:<UserDetails/>},
        { path: "mapPage", element: <MapPage /> },
        { path: "bookings", element: <PageSeven /> },
        { path: "Views", element: <PageEight /> },
        { path: "user/profile", element: <PageFive /> },
      ],
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
        { path: "register-unprotected", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "new-password", element: <NewPassword /> },
        { path: "mobileVerification", element: <MobileVerification /> },
        { path: "verify", element: <VerifyCode /> },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/dashboard/page1" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/dashboard/page1" replace /> },
  ]);
}

// Dashboard
const BlogPosts = Loadable(lazy(() => import("../pages/dashboard/BlogPosts")));
const BlogPost = Loadable(lazy(() => import("../pages/dashboard/BlogPost")));
const BlogNewPost = Loadable(
  lazy(() => import("../pages/dashboard/BlogNewPost"))
);
const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));
const PageThree = Loadable(lazy(() => import("../pages/PageThree")));
const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
const PageSix = Loadable(lazy(() => import("../pages/PageSix")));
const PageSeven = Loadable(lazy(() => import("../pages/PageSeven")));
const PageEight = Loadable(lazy(() => import("../pages/PageEight")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const UserDetails = Loadable(lazy(() => import("../pages/UserDetails")))
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const MobileVerification = Loadable(lazy(() => import("../pages/MobileVerification")))
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPassword = Loadable(lazy(() => import("../pages/auth/NewPassword")));
const VerifyCode = Loadable(lazy(() => import("../pages/auth/NewPassword")));
