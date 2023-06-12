import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import {LoginContext} from '../../context/LoginContext';


const Login = props => {
  const history = useHistory();
  const authorization = useContext(LoginContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'driver'
  });

  useEffect(() => {
      message(error);
      clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await request('/login', 'POST', {...form});

      authorization.login(data.jwtToken, data.userId, data.role);
      history.push(`/profile/${data.userId}`);
    } catch(e) {

    }
  };


  return (
    <div className="section__layout">
      <h1 className="section__title">Sign In</h1>
      <form
        onSubmit={loginHandler}
        className="form">
        <div className="form__container">
          <label htmlFor="user-email" className="form__label">Email</label>
          <input
            id="user-email"
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Password</label>
          <input
            type="password"
            id="user-password"
            name="password"
            autoComplete="on"
            className="form__input"
            onChange={changeHandler}
          />
          <p>{error}</p>
        </div>
        <div className="form__container">
          <label htmlFor="user-password"
                 className="form__label">Role</label>
          <select
            id="user-role"
            name="role"
            className="form__input"
            onChange={changeHandler}
          >
            <option>driver</option>
            <option>shipper</option>
          </select>
        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
