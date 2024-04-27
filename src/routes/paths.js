import RouteConstants from "../constants/RouteConstants";

// ----------------------------------------------------------------------

function path(root, sublink) {
  return `/${root}/${sublink}`;
}

function nestedPath(root, firstSubLink, secondSubLink) {
  return `/${root}/${firstSubLink}/${secondSubLink}`;
}

const ROOTS_DASHBOARD = "dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: RouteConstants.ROOT_AUTH,
  login: path(RouteConstants.ROOT_AUTH, RouteConstants.LOGIN),

};

export const PATH_PAGE = {

  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
    
  },
  


};

export const PATH_DOCS = "https://docs-minimals.vercel.app/introduction";
