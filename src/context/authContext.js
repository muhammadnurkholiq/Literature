import { createContext, useReducer } from "react";


// create context
export const AuthContext = createContext();

// this is initial value for global auth state (context)
const initialValue = {
  isLogin: false,
  user: {},
};

// reducer use to handle complex logic, use wisely
function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "AUTH_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

/** this is wrapper component that will use to be parent component of children that need to
 * consume the state globally
 * @param {*} children
 * @returns
 **/

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
