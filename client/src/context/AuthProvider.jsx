/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      // When the user login in successfully with Google and we receive the current user at the time.
      if (user?.uid) {
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }
      // Reset user infor when the user log out
      setUser({});
      localStorage.clear();
      // After that, we will navigate to another page
      navigate("/login");
    });
    return () => {
      unsubscribed();
    };
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
