import React, {useEffect, useState} from 'react';

import {useHttp} from '../../../../hooks/http.hook';
import {useMessage} from '../../../../hooks/message.hook';

const EditTruck = ({model, type, onEditedTruck})=> {

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
    model: model,
    type: type,
  });

  const changeHandler = (event) => {
    setEditForm({
      ...editFrom,
      [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
    })
  };

  const editTruckHandler = async(event) => {
    event.preventDefault();

    const editedTruck = await request(`${pathname}`, 'PUT', {...editFrom}, {
      'Content-Type': 'application/json',
      'Authorization': storeData.token
    });

    onEditedTruck(editedTruck);

  };


  return (
    <div>
      <form
        onSubmit={editTruckHandler}
        className="form">
        <h4 className="form__title">Edit Form</h4>
        <div className="form__container">
          <label htmlFor="truck-model" className="form__label">Model</label>
          <input
            required
            id="truck-model"
            type="text"
            name="model"
            className="form__input"
            defaultValue={model}
            onChange={changeHandler}
          />
        </div>

        <div className="form__container">
          <label htmlFor="truck-type"
                 className="form__label">Role</label>
          <select
            id="truck-type"
            name="type"
            className="form__input"
            defaultValue={type}
            onChange={changeHandler}
          >
            <option value="sprinter">sprinter (300x250x170, 1700)</option>
            <option value="small">small straight (500x250x170, 2500)</option>
            <option value="large">large straight (700x350x200, 4000)</option>
          </select>
        </div>


        <div className="form__container">
          <button
            type="submit"
            className="form__submit-button"
          >
            Edit Truck
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTruck;
