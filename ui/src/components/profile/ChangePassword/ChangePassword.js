import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

import './change-password.css';

const ChangePassword = props => {

  const history = useHistory();
  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);



  const changePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`/profile/${storeData.userId}/change-password`, 'PUT', {...form, role: storeData.role}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Password was changed!");
      history.push(`/profile/${storeData.userId}`);

    } catch(e) {
      console.log('Password was not changed', e)
    }
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };


  return (
    <div className="section__layout">
      <h1 className="section__title">Change Password</h1>
      <form
        onSubmit={changePasswordHandler}
        className="form">
        <div className="form__container">
          <label

            htmlFor="user-old-password"
            className="form__label change-password__label">Old Password</label>
          <input
            id="user-old-password"
            type="password"
            name="oldPassword"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="user-new-password"
                 className="form__label change-password__label">New Password</label>
          <input
            type="password"
            id="user-new-password"
            name="newPassword"
            className="form__input"
            onChange={changeHandler}
          />
          <p>{error}</p>
        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
