import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import {useLogin} from './hooks/login.hook';

import {LoginContext} from './context/LoginContext';
import useRoutes from './routes';




function App() {
  const {token, login, logout, userId, userRole} = useLogin();

  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated, userId, userRole);
  return (
    <LoginContext.Provider value={{
      token, login, logout, userId, userRole
    }}>
      <Router>
        <div className="App">
            {routes}
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
