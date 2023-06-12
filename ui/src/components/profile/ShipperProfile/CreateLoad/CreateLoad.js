import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';
import ShipperNav from '../ShipperNav/ShipperNav';


const CreateLoad = props => {

  const history = useHistory();
  const storageName = 'userData';
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    title: '',
    width: 0,
    length: 0,
    height: 0,
    payload: 0,
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);



  const createLoadHandler = async (e) => {
    e.preventDefault();


    try {
      const storeData = JSON.parse(localStorage.getItem(storageName));

      await request(`/loads/create-load`, 'POST', {...form, userId: storeData.userId}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      console.log("Load was created!");
      history.push(`/loads/new-loads`);

    } catch(e) {
      console.log('Load was not created', e)
    }
  };

  const changeHandler = (event) => {

    setForm({
      ...form,
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
    });
  };


  return (
    <div className="section__layout">
      <ShipperNav/>
      <h1 className="section__title">Create load</h1>
      <form
        onSubmit={createLoadHandler}
        className="form">
        <div className="form__container">
          <label htmlFor="load-title" className="form__label">Title</label>
          <input
            required
            id="load-title"
            type="text"
            name="title"
            placeholder="Book boxes"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-width"
                 className="form__label">Width</label>
          <input
            required
            type="number"
            id="load-width"
            name="width"
            placeholder="1000"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-length"
                 className="form__label">Length</label>
          <input
            required
            type="number"
            id="load-length"
            name="length"
            placeholder="1000"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-height"
                 className="form__label">Height</label>
          <input
            required
            type="number"
            id="load-height"
            name="height"
            placeholder="1000"
            className="form__input"
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-payload"
                 className="form__label">Payload </label>
          <input
            required
            placeholder="2000 (weight)"
            type="number"
            id="load-payload"
            name="payload"
            className="form__input"
            onChange={changeHandler}
          />

        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Create Load
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLoad;
