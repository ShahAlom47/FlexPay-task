


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

const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
  // navigate('/login');
};

useEffect(() => {
  const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const response = await axiosPublic.post('/is-login', {
                token:token
              });
              setUser(response.data.user);
            
          } catch (error) {
              if (error.response.status === 403 || error.response.status === 401) {
                  logout();
              } else {
                  console.error('Error checking login status:', error);
              }
          }
      }
  };

  const interval = setInterval(checkToken, 60000); // Check every minute

  checkToken(); // Initial check

  return () => clearInterval(interval);
}, []);

console.log(user);




  const userInfo = {
    user,
    loading,
    setToken
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