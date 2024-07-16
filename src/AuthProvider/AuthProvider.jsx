


import { createContext, useEffect, useState } from "react";

import PropTypes from 'prop-types'
import useAxiosPublic from "../CustomHocks/useAxiosPublic";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic()

  const setToken = async (user) => {
    try {
        const userInfo = user?.email; 
        if (userInfo) {
            const res = await axiosPublic.post('/jwt', { userInfo });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                return { token: res.data.token }; 
            }
        } else {
            throw new Error('User information is missing'); 
        }
    } catch (error) {
        console.error('Error setting token:', error.message);
        return null; 
    }
};


useEffect(() => {
  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axiosPublic.post('/is-login', { token });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          logout();
        } else {
          console.error('Error checking login status:', error);
        }
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const interval = setInterval(checkToken, 60000); // Check every minute

  checkToken(); // Initial check

  return () => clearInterval(interval);
}, [axiosPublic]);

const signIn = async (email, password) => {
  try {
      const res = await axiosPublic.post("/signIn", { email, password });

      if (res?.data?.message === 'Login successful') {
          setToken(res?.data?.user);
          setUser(res?.data?.user);
          return res.data;
      } else {
         
          return res
      }
  } catch (error) {
      console.error('Login error:', error);
    return error
  }
};


const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
};


console.log(user);


  const userInfo = {
    user,
    loading,
    setToken,
    signIn,
    logout
  }
  return (
    <AuthContext.Provider value={userInfo}>
      {
        children
      }

    </AuthContext.Provider>
  );
}

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node
};