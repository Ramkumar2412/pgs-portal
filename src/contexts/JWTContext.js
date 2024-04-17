import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
// utils
import { get } from "lodash";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

import ObjectStorage from "../modules/ObjectStorage";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('/api/account/my-account');
          // const { user } = response.data;
          const { user } = localStorage.getItem("UserData");

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user||'',
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (props) => {
    const { email, password } = props;
    const response = await axios.post("api/v1/auth/signin", {
      email,
      password,
    });

    const { accessToken, user } = response.data.data;

    ObjectStorage.setItem("accessToken", { accessToken });
    ObjectStorage.setItem("UserData", user);

    dispatch({
      type: "LOGIN",
      payload: { user },
    });
  };

  const register = async (props) => {
    const {
      firstName,
      lastName,
      contactNumber,
      eventName,
      eventDate,
      password,
      email,
    } = props;

    const response = await axios.post("api/v1/auth/signup", {
      firstName,
      lastName,
      contactNumber,
      eventName,
      eventDate,
      password,
      email,
    });
    const { accessToken, user } = response.data.data;

    // localStorage.setItem("accessToken", accessToken);

    // dispatch({
    //   type: "REGISTER",
    //   payload: {
    //     user,
    //   },
    // });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
