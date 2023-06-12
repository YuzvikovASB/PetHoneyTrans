import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';
import {LoginContext} from '../../../context/LoginContext';

const DeleteAccount = props => {

  const history = useHistory();
  const storageName = 'userData';
  const {request} = useHttp();

  const authorization = useContext(LoginContext);

  const [form, setForm] = useState({
    email: '',
  });


  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`/profile/${storeData.userId}/delete-account`, 'DELETE', {...form}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });
      console.log('User was deleted! Bye Bye!');
      authorization.logout();
      history.push('/');
    } catch(e) {
      console.log('Something went wrong. Account wasn\'t deleted', e)
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
      <h1 className="section__title">Are you sure you want to delete your account?</h1>
      <form
        onSubmit={deleteHandler}
        className="form">

        <div className="form__container">
          <label htmlFor="user-email"
                 className="form__label">Email</label>
          <input
            type="text"
            id="user-email"
            name="email"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            No way back
          </button>
        </div>
      </form>
    </div>
  );
};


export default DeleteAccount;
