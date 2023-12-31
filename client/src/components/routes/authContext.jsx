import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access_token") ?? false
  );

  const login = useCallback(function (token) {
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  }, []);

  /*useEffect(() => {
    // This is to handle the case where the user closes the browser without logging out
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [logout]);*/

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
