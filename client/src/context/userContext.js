import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();

  const getUser = () => {
    const logUser = JSON.parse(localStorage.getItem("token")) || null;
    if (logUser?.info?.role) {
      setUser(logUser);
      navigate("/sellerdashboard");
    } else if (logUser !== null && !logUser?.info?.role) {
      setUser(logUser);
      navigate("/");
    } else {
      setUser(logUser);
    }
  };

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(() => {
    getUser();
  }, [logOut]);

  // useEffect(() => {}, [logOut]);

  return (
    <UserContext.Provider value={{ user, setUser, logOut, setLogOut, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
