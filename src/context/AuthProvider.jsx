import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const loginWithCreds = async (email, password) => {
    try {
      const response = await axios.post(
        "https://prerogative-store.herokuapp.com/user/login",
        {
          email,
          password
        }
      );
      if (response.data.success) {
        // axios.interceptors.response.use(response => {
        //   console.log(response);
        // });

        setUser(response.data.user);
        localStorage?.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const logout = () => {
    localStorage?.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const signUpWithCreds = async (name, email, password) => {
    try {
      const response = await axios.post(
        "https://prerogative-store.herokuapp.com/user/signup",
        {
          name,
          email,
          password
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  return (
    <authContext.Provider
      value={{ user, setUser, loginWithCreds, logout, signUpWithCreds }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
