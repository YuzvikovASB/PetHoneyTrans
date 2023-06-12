import { useState, useCallback } from 'react'

const storageName = 'userData';

export const useLogin = () => {

  const userData = JSON.parse(localStorage.getItem('userData'));

  const [token, setToken] = useState(userData && userData.token || null);
  const [userId, setUserId] = useState(userData && userData.userId || null);
  const [userRole, setUserRole] = useState(userData && userData.role || null);

  const login = useCallback( (jwtToken, id, role) => {
    setToken(jwtToken);
    setUserId(id);
    setUserRole(role);
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, role: role
    }))
  }, []);

  const logout = useCallback( () => {
    setToken(null);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem(storageName)
  }, []);


  return {
    login,
    logout,
    token,
    userId,
    userRole
  }

};
