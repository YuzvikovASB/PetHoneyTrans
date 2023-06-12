import React, {useEffect, useState} from 'react';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';

const EditLoad = ({title, width, length, height, payload, onEditedLoad})=> {

  const storageName = 'userData';
  const storeData = JSON.parse(localStorage.getItem(storageName));
  const pathname = window.location.pathname;
  const {request, error, clearError} = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const [editFrom, setEditForm] = useState({
    title: title,
    width: width,
    length: length,
    height: height,
    payload: payload,
  });

  const changeHandler = (event) => {
    setEditForm({
      ...editFrom,
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
    })
  };

  const createLoadHandler = async(event) => {
    event.preventDefault();
    try {
      const editedLoad = await request(`${pathname}`, 'PUT', {...editFrom}, {
        'Content-Type': 'application/json',
        'Authorization': storeData.token
      });

      onEditedLoad(editedLoad);
    } catch(e) {
      console.log('Error', e);
    }

  };


  return (
    <div>
      <form
        onSubmit={createLoadHandler}
        className="form">
        <h4 className="form__title">Edit Form</h4>
        <div className="form__container">
          <label htmlFor="load-title" className="form__label">Title</label>
          <input
            id="load-title"
            type="text"
            name="title"
            className="form__input"
            defaultValue={title}
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-width"
                 className="form__label">Width</label>
          <input
            type="number"
            id="load-width"
            name="width"
            className="form__input"
            defaultValue={width}
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-length"
                 className="form__label">Length</label>
          <input
            type="number"
            id="load-length"
            name="length"
            className="form__input"
            defaultValue={length}
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-height"
                 className="form__label">Height</label>
          <input
            type="number"
            id="load-height"
            name="height"
            className="form__input"
            defaultValue={height}
            onChange={changeHandler}
          />
        </div>
        <div className="form__container">
          <label htmlFor="load-payload"
                 className="form__label">Payload</label>
          <input
            type="number"
            id="load-payload"
            name="payload"
            className="form__input"
            defaultValue={payload}
            onChange={changeHandler}
          />

        </div>
        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Edit Load
          </button>
        </div>
      </form>
    </div>
  );
};


export default EditLoad;
